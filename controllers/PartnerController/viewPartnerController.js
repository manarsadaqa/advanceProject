const { getPartnerById, getAllPartners } = require("../../models/partnerModel");

const viewPartnerById = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const partner = await getPartnerById(partnerId);

    if (!partner.length) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    res.status(200).json({
      success: true,
      partner: partner[0],
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to get Partner",
      error: error.message,
    });
  }
};

const viewAllPartners = async (req, res) => {
  try {
    const partners = await getAllPartners();

    res.status(200).json({
      success: true,
      partners,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to get Partners",
      error: error.message,
    });
  }
};

module.exports = { viewPartnerById, viewAllPartners };
