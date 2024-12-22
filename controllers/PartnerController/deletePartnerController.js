const { deletePartnerById } = require("../../models/partnerModel");

const deletePartnerByIdController = async (req, res) => {
  try {
    const partnerId = req.params.id;
    const result = await deletePartnerById(partnerId);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to delete Partner",
      error: error.message,
    });
  }
};

module.exports = { deletePartnerByIdController };
