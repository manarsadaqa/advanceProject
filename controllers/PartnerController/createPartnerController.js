const { createPartnerService } = require("../../services/PartnerServices/createPartnerService");

const createPartner = async (req, res) => {
  const {
    name,
    descriptin,
    email,
    phone,
    address,
    website_url
  } = req.body;

  const errors = [];
  const alphaSpaceRegex = /^[A-Za-z\s]+$/;

  if (!alphaSpaceRegex.test(name)) {
    errors.push("Name can only contain letters and spaces");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  try {
    const partner = {
      user_id_fr: req.userId, // Assuming req.userId is set by your authentication middleware
      name: name,
      descriptin: descriptin,
      email: email,
      phone: phone,
      address: address,
      websit_url: website_url, // Notice: websit_url instead of website_url to match table schema
    };

    const newPartner = await createPartnerService(partner);
    res.status(201).json({
      success: true,
      message: "Partner created successfully",
      partnerDetails: newPartner,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to create Partner",
      error: error.message,
    });
  }
};

module.exports = { createPartner };
