const express = require("express");
const router = express.Router();
const {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach,
} = require("../controllers/coachController");
const { protect, adminOnly } = require("../middleware/auth");
const { upload, processImageUpload } = require("../middleware/upload");
router.get("/", getAllCoaches);
router.get("/:id", getCoachById);
router.post(
  "/",
  protect,
  adminOnly(),
  upload.single("image"),
  processImageUpload("coaches"),
  createCoach,
);
router.put(
  "/:id",
  protect,
  adminOnly(),
  upload.single("image"),
  processImageUpload("coaches"),
  updateCoach,
);
router.delete("/:id", protect, adminOnly(), deleteCoach);
module.exports = router;
