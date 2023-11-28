const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const {
      name,
      start_date,
      end_date,
      owner,
      description,
      project_access,
      created_date,
      updated_date,
    } = req.body;
    if (!name || !owner) {
      return res.status(400).json({
        success: false,
        message: "Name and Owner fields are required",
      });
    }
    const ProjectDetails = await Project.create({
      name,
      start_date,
      end_date,
      owner,
      description,
      project_access,
      created_date,
      updated_date,
      created_date: created_date,
      updated_date: updated_date,
    });
    // console.log(ProjectDetails);
    return res.status(200).json({
      success: true,
      message: "Project Created Successfully",
      ProjectDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
