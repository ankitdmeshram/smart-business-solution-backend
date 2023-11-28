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

exports.allProject = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      projects: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      start_date,
      end_date,
      owner,
      description,
      project_access,
      created_date,
      updated_date,
    } = req.body;

    const body = {
      _id,
      name,
      start_date,
      end_date,
      owner,
      description,
      project_access,
      created_date,
      updated_date,
    };

    console.log("body", body);

    if (!name || !owner) {
      return res.status(400).json({
        success: false,
        message: "Name and Owner fields are required",
      });
    }
    // console.log("Product Id", _id);
    const project = await Project.findByIdAndUpdate(_id, body);
    // console.log(product, "product");
    return res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project: body,
    });
  } catch (error) {
    // console.log("error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
