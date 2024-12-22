const { addNewVolunteer } = require('../../models/volunteerModel');

const createVolunteer = async (req, res) => {
  const {
    name,
    signup_date,
    activity_id,
    activity_name,
    description,
    activity_date,
    activity_location
  } = req.body;

  try {
    const volunteer = {
      name,
      signup_date,
      activity_id,
      activity_name,
      description,
      activity_date,
      activity_location
    };

    const newVolunteer = await addNewVolunteer(volunteer);
    res.status(201).json({
      success: true,
      message: "Volunteer created successfully",
      volunteerDetails: newVolunteer,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: "Failed to create volunteer",
      error: error.message,
    });
  }
};

module.exports = { createVolunteer };

 