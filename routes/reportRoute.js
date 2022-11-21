const express = require("express");
const router = express.Router();

const {
  getMyReport,
  createReport,
  deleteReport,
  getAllReport,
  updateReport,
  createCatgory,
  fetchCatgory,
} = require("../controllers/report");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMyReport);
router.post("/", protect, createReport);
router.delete("/:id", protect, deleteReport);
router.get("/admin/39104245", getAllReport);
router.put("/admin/39104245/:id", updateReport);
router.post("/admin/39104245", createCatgory);
router.get("/admin/39104245/cat", fetchCatgory);

module.exports = router;
