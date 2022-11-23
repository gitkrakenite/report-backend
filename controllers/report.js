const Report = require("../models/reportModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");

// DESC     get only my reports
// METHOD   GET /api/v1/report
// ACCESS   private
const getMyReport = async (req, res) => {
  try {
    const report = await Report.find({ user: req.user.id });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DESC     create a report
// METHOD   POST /api/v1/report
// ACCESS   private
const createReport = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.category) {
    res.status(400).json({ message: "A value is missing" });
    return;
  }

  try {
    const report = await Report.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      email: req.body.email,
      name: req.body.name,
      category: req.body.category,
      user: req.user.id,
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DESC     delete my report
// METHOD   DELETE /api/v1/report/id
// ACCESS   private
const deleteReport = async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(400).json({ message: "report not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (report.user.toString() !== user.id) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete report" });
  }
};

// DESC     get all reports
// METHOD   GET /api/v1/report/admin/39104245
// ACCESS   public
const getAllReport = async (req, res) => {
  try {
    const report = await Report.find();

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DESC     update all reports
// METHOD   PUT /api/v1/report/admin/39104245/id
// ACCESS   public
const updateReport = async (req, res) => {
  const report = await Report.findById(req.params.id);
  // console.log(req.body);

  if (!report) {
    res.status(400).json({ message: "Goal not found" });
    return;
  }

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: "Could not update report" });
  }
};

// Create category
const createCatgory = async (req, res) => {
  if (!req.body.category) {
    res.status(400).json({ message: "Category missing" });
    return;
  }
  try {
    const report = await Category.create({
      category: req.body.category,
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

// fetch category
const fetchCatgory = async (req, res) => {
  try {
    const report = await Category.find();
    res.status(200).json(report);
    // console.log("worked");
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

// delete category
const deleteCategory = async (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ message: "No Id sent" });
    return;
  }

  try {
    const report = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

module.exports = {
  getMyReport,
  createReport,
  deleteReport,
  getAllReport,
  updateReport,
  createCatgory,
  fetchCatgory,
  deleteCategory,
};
