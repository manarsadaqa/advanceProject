const { updatePartnerById } = require("../../models/partnerModel");

const updatePartnerByIdController = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const updatedFields = req.body;

    const result = await updatePartnerById(partnerId, updatedFields);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Partner updated successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to update Partner",
      error: error.message,
    });
  }
};

module.exports = { updatePartnerByIdController };
