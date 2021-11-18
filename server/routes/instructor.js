import express from "express";

const router = express.Router();
// middleware
import { requireSignin } from "../middelwares";
// controllers
import { makeInstructor } from "../controllers/instructor";

router.post("/make-instructor", requireSignin, makeInstructor);

module.exports = router;
