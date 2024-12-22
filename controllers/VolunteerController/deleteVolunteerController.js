const { deleteVolunteerById } = require('../../models/volunteerModel');

const deleteVolunteer = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteVolunteerById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Volunteer deleted successfully",
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Failed to delete volunteer",
            error: error.message,
        });
    }
};

module.exports = {
    deleteVolunteerById: deleteVolunteer,
};
