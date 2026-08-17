const Config = require("../models/Config");

const getConfig = async (req, res) => {
  try {
    const config = await Config.findOne().sort({ config_version: -1 }).lean();

    if (!config) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    const activeQuestions = config.questions.filter((q) => q.active);

    res.status(200).json({
      config_version: config.config_version,
      business: config.business,
      questions: activeQuestions,
    });
  } catch (error) {
    console.error("Get config error:", error.message);
    res.status(500).json({ message: "Failed to fetch configuration" });
  }
};

const getConfigFull = async (req, res) => {
  try {
    const config = await Config.findOne().sort({ config_version: -1 }).lean();

    if (!config) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    res.status(200).json(config);
  } catch (error) {
    console.error("Get full config error:", error.message);
    res.status(500).json({ message: "Failed to fetch configuration" });
  }
};

const updateConfig = async (req, res) => {
  try {
    const updates = req.body;
    const config = await Config.findOne().sort({ config_version: -1 });

    if (!config) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    if (updates.business) {
      config.business = { ...config.business, ...updates.business };
    }

    if (updates.modifiers) {
      config.modifiers = { ...config.modifiers, ...updates.modifiers };
    }

    if (updates.questions) {
      config.questions = updates.questions;
    }

    config.config_version = config.config_version + 1;
    await config.save();

    res.status(200).json({
      message: "Configuration updated",
      config_version: config.config_version,
    });
  } catch (error) {
    console.error("Update config error:", error.message);
    res.status(500).json({ message: "Failed to update configuration" });
  }
};

module.exports = { getConfig, getConfigFull, updateConfig };
