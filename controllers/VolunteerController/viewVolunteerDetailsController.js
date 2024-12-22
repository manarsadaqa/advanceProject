const { getVolunteerById, getAllVolunteers } = require('../../models/volunteerModel');

const viewVolunteerDetailsController = async (req, res) => {
    try {
        const volunteers = await getAllVolunteers();
        res.status(200).json({
            success: true,
            volunteers,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Failed to retrieve volunteers",
            error: error.message,
        });
    }
};

const viewVolunteerById = async (req, res) => {
    const { id } = req.params;

    try {
        const volunteer = await getVolunteerById(id);
        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found",
            });
        }

        res.status(200).json({
            success: true,
            volunteer,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Failed to retrieve volunteer",
            error: error.message,
        });
    }
};

module.exports = {
    viewVolunteerDetailsController,
    viewVolunteerById,
};
