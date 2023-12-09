const mongoose = require("mongoose");

const landingPageSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  owner: {
    type: String,
  },
  companyName: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  email: {
    type: String,
  },
  phone1: {
    type: String,
  },
  phone2: {
    type: String,
  },
  aboutCompany: {
    type: String,
  },
  aboutCompanyDetails: {
    type: String,
  },
  services: {
    type: String,
  },
  servicesList: [
    {
      type: String,
    },
  ],
  servicesTagline: {
    type: String,
  },
  ctaTagLine: {
    type: String,
  },
  testimonials: {
    type: String,
  },
  testimonialTagline: {
    type: String,
  },
  testimonialList: [
    {
      type: String,
    },
  ],
  address: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("landingPage", landingPageSchema);
