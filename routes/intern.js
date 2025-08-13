import express from "express";

import { create_intern, get_interns } from "../controllers/intern_controller.js";

const router = express.Router();

router.post("/interns", create_intern);

router.get("/interns", get_interns);

export default router;
