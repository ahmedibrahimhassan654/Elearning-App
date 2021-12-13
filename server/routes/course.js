import express from "express";

const router = express.Router();
// middleware
import { requireSignin } from "../middelwares";
// controllers
import { uploadeImage } from "../controllers/course";

router.post("/course/uploade-image", uploadeImage);

module.exports = router;
