const LandingPage = require("../models/LandingPage");

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
    sendmail(
      "ankitdm69@gmail.com",
      owner,
      "Congratulations, Your website is live",
      "",
      `Hey ${owner}, <br />Your website <b> ${companyName} </b> created successfully.   <br/>You can visit your website here <a href="http://localhost:8788/web/${landingPageDetails?._id}">${companyName} </a>`
    );

    return res.status(200).json({
      success: true,
      message: "Landing Page Generated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLandingPage = async (req, res) => {
  try {
    const {
      owner,
      companyName,
      shortDescription,
      email,
      phone1,
      phone2,
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
        message: "Owner Already Exists",
      });
    }
    const landingPageDetails = await LandingPage.create({
      owner,
      companyName,
      shortDescription,
      email,
      phone1,
      phone2,
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
      message: "Landing Page Generated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};