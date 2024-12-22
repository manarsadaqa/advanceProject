const { getInvitationDetails } = require(`../../models/invationModle`);
const { getAllAvailableGardensId } = require(`../../models/gardenModel`);
const viewInvationsService = async (userId) => {
  try {
    // Fetch invitation details
    const invitationDetails = await getInvitationDetails({
      user_id: userId,
    });
    console.log(invitationDetails);
    if (invitationDetails.length == 0) {
      const error = new Error("No invitations available for !");
      error.status = 404;
      throw error;
    }
    // Extract project IDs from invitation details
    const projectIds = invitationDetails.map(
      (invitation) => invitation.garden_id
    );

    // Fetch project details for each project ID
    const projectsDetails = [];
    for (const id of projectIds) {
      const projectData = await getAllAvailableGardensId(id);
      projectsDetails.push(projectData[0]); // Assuming you expect only one project per ID
    }

    // Map each invitation to its corresponding project details
    const mappedInvitations = invitationDetails.map((invitation, index) => ({
      invitation,
      projectDetails: {
        garden_id: projectsDetails[index].id,
        creatorUserId: projectsDetails[index].creatorUserID,
        garden_name: projectsDetails[index].garden_name,
        description: projectsDetails[index].description,
        creation_date: projectsDetails[index].creation_date,
        image_url: projectsDetails[index].image_url,
      },
    }));

    return mappedInvitations;
  } catch (error) {
    throw error;
  }
};
module.exports = { viewInvationsService };
