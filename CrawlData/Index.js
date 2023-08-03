const CrawlDataVNBooking = require("../CrawlData/CrawlVNBooking");
const CrawlDataVNIVIVU = require("../CrawlData/Crawlivivu");
const CrawlDataBlog = require("../CrawlData/CrawlBlog");
const UpdateCollection = require("../CrawlData/Collection");

module.exports.getTourData = async (req, res) => {
  try {
    await CrawlDataVNBooking.getlink();
  } catch (error) {
    console.log(error);
  }
  try {
    await CrawlDataVNIVIVU.getlistTour();
  } catch (error) {
    console.log(error);
  }
  res.json("Update Successfully");
};

module.exports.getBlog = async (req, res) => {
  try {
    await CrawlDataBlog.getBlog();
  } catch (error) {
    console.log(error);
  }
  res.json("Update Successfully");
};

module.exports.createCollection = async (req, res) => {
  try {
    await UpdateCollection.CreateAllCollection();
  } catch (error) {
    console.log(error);
  }
  res.json("Update Successfully");
};
