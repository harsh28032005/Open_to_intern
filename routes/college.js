import express from "express";
import {
  create_college,
  get_college,
  get_college_details,
} from "../controllers/college_controller.js";

const router = express.Router();

router.post("/colleges", create_college);

router.get("/colleges", get_college_details);

router.get("/collegeDetails", get_college);

export default router;
