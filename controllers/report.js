const Report = require("../models/reportModel");

// DESC     get only my reports
// METHOD   GET /api/v1/report
// ACCESS   private
const getMyReport = async (req, res) => {
  try {
    const report = await Report.find();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DESC     create a report
// METHOD   POST /api/v1/report
// ACCESS   private
const createReport = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.image) {
    res.status(400).json({ message: "A value is missing" });
    return;
  }

  try {
    const report = await Report.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
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

  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deletion Succesful" });
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
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DESC     get all reports
// METHOD   GET /api/v1/report/admin/39104245
// ACCESS   public
const updateReport = async (req, res) => {
  const report = await Report.findById(req.params.id);

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

module.exports = {
  getMyReport,
  createReport,
  deleteReport,
  getAllReport,
  updateReport,
};
