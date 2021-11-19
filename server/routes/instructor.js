import express from "express";

const router = express.Router();
// middleware
import { requireSignin } from "../middelwares";
// controllers
import {
  makeInstructor,
  getAccountStatus,
  getCurrentInstructor,
} from "../controllers/instructor";

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.get("/current-instructor", requireSignin, getCurrentInstructor);
module.exports = router;
