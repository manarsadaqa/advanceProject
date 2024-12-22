const { getAllPublishedProjects } = require(`../../models/gardenModel`);
const viewPublishedProjectService = async (filterOptions) => {
  try {
    const publishedProjects = await getAllPublishedProjects(filterOptions);
    const projectsInfo = publishedProjects.map((project) => ({
      id: project.id,
      creatorUserID: project.creatorUserID,
      project_name: project.project_name,
      description: project.description,
      image_url: project.image_url,
      project_rank: project.project_rank,
      project_materials: project.project_materials,
      categories: project.categories,
      project_participants: project.participants,
      status: project.status,
      price: project.price,
    }));
    return projectsInfo;
  } catch (error) {
    throw error;
  }
};

module.exports = { viewPublishedProjectService };
