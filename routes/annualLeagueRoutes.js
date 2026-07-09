const express = require("express");
const router = express.Router();
const {
  getAllSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmission,
  deleteSubmission,
} = require("../controllers/annualLeagueController");
const { protect, adminOnly } = require("../middleware/auth");
router.get("/", getAllSubmissions);
router.get("/:id", getSubmissionById);
router.post("/", createSubmission);
router.put("/:id", protect, adminOnly(), updateSubmission);
router.patch("/:id", protect, adminOnly(), updateSubmission);
router.delete("/:id", protect, adminOnly(), deleteSubmission);
module.exports = router;
