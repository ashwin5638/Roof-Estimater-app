const Config = require("../models/Config");
const Lead = require("../models/Lead");
const { calculateEstimate } = require("../services/calculator");

const postEstimate = async (req, res) => {
  try {
    const { name, phone, email, answers } = req.body;

    if (!name || !phone || !email || !answers) {
      return res.status(400).json({
        message: "Missing required fields: name, phone, email, answers",
      });
    }

    const config = await Config.findOne()
      .sort({ config_version: -1 })
      .lean();

    if (!config) {
      return res
        .status(500)
        .json({ message: "Configuration not available" });
    }

    const roofArea = Number(answers["roof_area"] || 0);
    const roofQuestion = config.questions.find(
      (q) => q.key === "roof_area"
    );
    if (roofQuestion) {
      if (roofQuestion.min && roofArea < roofQuestion.min) {
        return res.status(400).json({
          message: `Roof area must be at least ${roofQuestion.min} sq ft`,
        });
      }
      if (roofQuestion.max && roofArea > roofQuestion.max) {
        return res.status(400).json({
          message: `Roof area must be at most ${roofQuestion.max} sq ft`,
        });
      }
    }

    const selectKeys = ["material", "pitch", "layers", "stories"];
    for (const key of selectKeys) {
      const q = config.questions.find((item) => item.key === key);
      if (!q) continue;
      if (q.active && q.required && !answers[key]) {
        return res
          .status(400)
          .json({ message: `Missing required answer for: ${q.label}` });
      }
      if (q.options && q.options.length > 0) {
        const validValues = q.options.map((o) => o.value);
        if (answers[key] && !validValues.includes(answers[key])) {
          return res.status(400).json({
            message: `Invalid option for ${q.label}`,
          });
        }
      }
    }

    const { estimate_low, estimate_high } = calculateEstimate(
      config,
      answers
    );

    const lead = new Lead({
      name,
      phone,
      email,
      answers,
      estimate_low,
      estimate_high,
      config_version: config.config_version,
    });

    await lead.save();

    res.status(201).json({
      estimate_low,
      estimate_high,
      currency: config.business.currency || "USD",
    });
  } catch (error) {
    console.error("Estimate error:", error.message);
    res.status(500).json({ message: "Failed to process estimate" });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(leads);
  } catch (error) {
    console.error("Get leads error:", error.message);
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};

module.exports = { postEstimate, getLeads };
