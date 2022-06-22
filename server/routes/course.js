import express from "express";

const router = express.Router();
// middleware
import { requireSignin } from "../middelwares";
// controllers
import { uploadeImage, removeImage } from "../controllers/course";

router.post("/course/uploade-image", uploadeImage);
router.post("/course/remove-image", removeImage);

module.exports = router;
