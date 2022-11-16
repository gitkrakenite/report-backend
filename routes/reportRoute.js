const express = require("express");
const router = express.Router();

const {
  getMyReport,
  createReport,
  deleteReport,
  getAllReport,
  updateReport,
} = require("../controllers/report");

router.get("/", getMyReport);

router.post("/", createReport);
router.delete("/:id", deleteReport);
router.get("/admin/39104245", getAllReport);
router.put("/admin/39104245/:id", updateReport);

module.exports = router;
