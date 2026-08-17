const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Config = require("../models/Config");

dotenv.config();

const seedConfig = {
  config_version: 3,

  business: {
    name: "Northline Roofing & Exteriors",
    region: "USA",
    currency: "USD",
  },

  questions: [
    {
      key: "roof_area",
      label: "What is the approximate roof area?",
      type: "number",
      unit: "sq ft",
      required: true,
      min: 500,
      max: 10000,
      active: true,
      options: [],
    },
    {
      key: "material",
      label: "What roofing material do you prefer?",
      type: "select",
      required: true,
      active: true,
      options: [
        { value: "asphalt", label: "Asphalt Shingles", rate_per_sqft: 4.5 },
        { value: "metal", label: "Metal Roofing", rate_per_sqft: 8 },
        { value: "tile", label: "Tile Roofing", rate_per_sqft: 10 },
      ],
    },
    {
      key: "pitch",
      label: "What is the roof pitch?",
      type: "select",
      required: true,
      active: true,
      options: [
        { value: "low", label: "Low Pitch", multiplier: 1.0 },
        { value: "medium", label: "Medium Pitch", multiplier: 1.08 },
        { value: "steep", label: "Steep Pitch", multiplier: 1.15 },
      ],
    },
    {
      key: "layers",
      label: "How many existing roofing layers need removal?",
      type: "select",
      required: true,
      active: true,
      options: [
        { value: "one", label: "One Layer", tear_off_per_sqft: 1.0 },
        { value: "two", label: "Two Layers", tear_off_per_sqft: 1.75 },
        { value: "three", label: "Three Layers", tear_off_per_sqft: 2.5 },
      ],
    },
    {
      key: "stories",
      label: "How many stories is the property?",
      type: "select",
      required: true,
      active: true,
      options: [
        { value: "one", label: "1 Story", multiplier: 1.0 },
        { value: "two", label: "2 Stories", multiplier: 1.08 },
        { value: "three", label: "3+ Stories", multiplier: 1.15 },
      ],
    },
  ],

  modifiers: {
    waste_factor: 0.1,
    permit_flat_fee: 350,
    range_spread_pct: 12,
  },
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("MongoDB connected for seeding");

    await Config.deleteMany({});
    await Config.create(seedConfig);

    console.log("Config seeded successfully (v3)");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
