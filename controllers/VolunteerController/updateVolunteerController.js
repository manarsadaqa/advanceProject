const { updateVolunteerById } = require('../../models/volunteerModel');

const updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    try {
        const result = await updateVolunteerById(id, updatedFields);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Volunteer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Volunteer updated successfully",
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: "Failed to update volunteer",
            error: error.message,
        });
    }
};

module.exports = { updateVolunteerById: updateVolunteer };
