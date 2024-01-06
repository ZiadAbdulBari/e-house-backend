// Set Variant
// Get Variant
// set Variant value

const Variant = require("../models/variant.model");

module.exports.addVariant = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    await Variant.create({ variant_name: req.body.variant_name });
    return res.status(200).json({
      status: 200,
      message: "Variant successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports.getVariant = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const allVariant = await Variant.findAll();
    return res.status(200).json({
      status: 200,
      data: allVariant,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
