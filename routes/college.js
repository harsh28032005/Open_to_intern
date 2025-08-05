import express from "express";
import { create_college } from "../controllers/college_controller.js";

const router = express.Router();

router.post("/colleges", create_college);

export default router;
