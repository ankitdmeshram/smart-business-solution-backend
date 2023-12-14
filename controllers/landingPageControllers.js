const LandingPage = require("../models/LandingPage");
const { sendmail } = require("../controllers/mailController");

exports.allLandingPages = async (req, res) => {
  try {
    const landingPageData = await LandingPage.find().sort({ created_at: -1 });

    return res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      landingPageData: landingPageData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.generateLandingPage = async (req, res) => {
  try {
    const {
      owner,
      teamMember,
      companyName,
      shortDescription,
      email,
      phone1,
      phone2,
      liveStatus,
      aboutCompany,
      aboutCompanyDetails,
      services,
      servicesList,
      servicesTagline,
      ctaTagLine,
      testimonials,
      testimonialTagline,
      testimonialList,
      address,
      logo,
    } = req.body;
    if (!owner) {
      return res.status(400).json({
        success: false,
        message: "Owner fields are required",
      });
    }
    const existingOwner = await LandingPage.find({ owner: owner });

    if (existingOwner.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You can create only 1 website only",
      });
    }
    const landingPageDetails = await LandingPage.create({
      owner,
      teamMember,
      companyName,
      shortDescription,
      email,
      phone1,
      phone2,
      liveStatus,
      aboutCompany,
      aboutCompanyDetails,
      logo,
      services,
      servicesList,
      servicesTagline,
      ctaTagLine,
      testimonials,
      testimonialTagline,
      testimonialList,
      address,
    });
    sendmail(
      "ankitdm69@gmail.com",
      owner,
      "Congratulations, Your website is live",
      "",
      `Hey ${owner}, <br />Your website <b> ${companyName} </b> created successfully.   <br/>You can visit your website here <a href="http://localhost:8788/${landingPageDetails?._id}">${companyName} </a>`
    );

    return res.status(200).json({
      success: true,
      message: "Landing Page Generated Successfully",
      landingPageDetails: landingPageDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.viewLandingPage = async (req, res) => {
  try {
    const { _id } = req.body;

    const website = await LandingPage.find({ _id: _id });

    if (website.length == 0) {
      return res.status(200).json({
        success: true,
        message: "No Website Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Website found successfully",
      website: website,
    });
  } catch (err) {
    return res.status(504).json({
      success: false,
      message: `Something went wrong ${err}`,
    });
  }
};

exports.updateLandingPage = async (req, res) => {
  try {
    const {
      _id,
      owner,
      teamMember,
      companyName,
      shortDescription,
      email,
      phone1,
      phone2,
      liveStatus,
      aboutCompany,
      aboutCompanyDetails,
      services,
      servicesList,
      servicesTagline,
      ctaTagLine,
      testimonials,
      testimonialTagline,
      testimonialList,
      address,
    } = req.body;
    if (!owner || !companyName) {
      return res.status(400).json({
        success: false,
        message: "Owner and Company Name fields are required",
      });
    }

    // const existingOwner = await LandingPage.find({ owner: owner });

    // if (existingOwner.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Owner Already Exists",
    //   });
    // }

    const landingPageDetails = await LandingPage.findByIdAndUpdate(_id, {
      owner,
      teamMember,
      companyName,
      shortDescription,
      email,
      phone1,
      phone2,
      liveStatus,
      aboutCompany,
      aboutCompanyDetails,
      services,
      servicesList,
      servicesTagline,
      ctaTagLine,
      testimonials,
      testimonialTagline,
      testimonialList,
      address,
    });
    return res.status(200).json({
      success: true,
      message: "Landing Page Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteLandingPage = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Landing page deleted successfully",
    });
  } catch (err) {
    console.log("Something went wrong", err);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
