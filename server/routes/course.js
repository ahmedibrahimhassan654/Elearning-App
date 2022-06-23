import express from "express";

const router = express.Router();
// middleware
import { requireSignin, isInstructor } from "../middelwares";
// controllers
import { uploadeImage, removeImage, create } from "../controllers/course";
// image
router.post("/course/uploade-image", uploadeImage);
router.post("/course/remove-image", removeImage);

// course
router.post("/course", requireSignin, isInstructor, create);
module.exports = router;
