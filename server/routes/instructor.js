import express from "express";

const router = express.Router();
// middleware
import { requireSignin, isInstructor } from "../middelwares";
// controllers
import {
  makeInstructor,
  getAccountStatus,
  getCurrentInstructor,
  instructorCourses
} from "../controllers/instructor";

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.get("/current-instructor", requireSignin, getCurrentInstructor);
// courses
router.get(
  "/instructor-courses",
  requireSignin,
  isInstructor,
  instructorCourses
);
module.exports = router;
