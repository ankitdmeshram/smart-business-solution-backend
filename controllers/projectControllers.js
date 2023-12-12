const Project = require("../models/Project");
const { sendmail } = require("./mailController");

exports.createProject = async (req, res) => {
  try {
    const {
      name,
      start_date,
      end_date,
      owner,
      description,
      project_access,
      project_team,
      status,
      created_at,
      updated_at,
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
      status,
      description,
      project_access,
      project_team,
      created_at: created_at,
      updated_at: updated_at,
    });



    sendmail(
      "ankitdm69@gmail.com",
      [owner],
      "Congratulations, You have created a new project",
      "",
      `Hey, <br />You have created new project called ${name} <br/>You can check your project here <a href="http://localhost:8788/tasks/${ProjectDetails?._id}">${name} </a> <br /><br/>Best Regards,<br/>SBS Solution`
    );
    sendmail(
      "ankitdm69@gmail.com", // from (do not change)
      [...project_team], // to
      "Congratulations, You have added in new project", // subject
      "",
      `Hey, <br />You have added in new project called ${name} <br/>You can check project here <a href="http://localhost:8788/tasks/${ProjectDetails?._id}">${name} </a> <br /><br/>Best Regards,<br/>SBS Solution`
    );

    return res.status(200).json({
      success: true,
      message: "Project Created Successfully",
      projectDetails: ProjectDetails,
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
    const projects = await Project.find().sort({ created_at: -1 });
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

exports.updateProject = async (req, res) => {
  try {
    const {
      _id,
      name,
      start_date,
      end_date,
      status,
      owner,
      description,
      project_access,
      created_at,
      updated_at,
    } = req.body;

    const body = {
      _id: _id,
      name: name,
      start_date: start_date,
      end_date: end_date,
      owner: owner,
      status,
      description: description,
      project_access: project_access,
      created_at: created_at,
      updated_at: updated_at,
    };

    if (!name || !owner) {
      return res.status(400).json({
        success: false,
        message: "Name and Owner fields are required",
      });
    }
    const project = await Project.findByIdAndUpdate(_id, body);
    sendmail(
      "ankitdm69@gmail.com",
      owner,
      "Your project updated successfully",
      "",
      `Hey ${owner}, <br />Your project ${name} updated successfully <br/>You can check your projects <a href="http://localhost:8788/projects">Projects </a> <br /><br/>Best Regards,<br/>SBS Solution`
    );
    return res.status(200).json({
      success: true,
      message: "Project Updated Successfully",
      project: body,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.viewProjectByAccess = async (req, res) => {
  try {
    const { email } = req.body;

    const projects = await Project.find({
      $or: [{ owner: email }, { project_team: { $in: [email] } }],
    }).sort({ created_at: -1 });

    if (projects.length == 0) {
      return res.status(200).json({
        success: true,
        message: "No Projects Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Projects found successfully",
      projects,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: `Something went wrong ${err}`,
    });
  }
};

exports.viewProjectByID = async (req, res) => {
  try {
    const { pid } = req.body;

    const projects = await Project.find({ _id: pid });

    if (projects.length == 0) {
      return res.status(200).json({
        success: true,
        message: "No Projects Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      project: projects,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: `Something went wrong ${err}`,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { _id, email } = req.body;
    const project = await Project.findById({ _id: _id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "project not found",
      });
    }

    console.log("project", project);

    if (project?.owner == email) {
      await Project.findByIdAndDelete({ _id: _id });
      sendmail(
        "ankitdm69@gmail.com",
        project?.owner,
        "Deleted Project Successfully",
        "",
        `Hey ${project?.owner}, <br />You have deleted your project ${project?.name} <br/>You can check your projects here <a href="http://localhost:8788/projects">Projects </a> <br /><br/>Best Regards,<br/>SBS Solution`
      );
      res.status(200).json({
        success: true,
        message: "project deleted successfully",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "You don't have access to delete",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "project Cannot be deleted successfully",
      error,
    });
  }
};
