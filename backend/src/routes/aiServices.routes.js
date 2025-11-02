import express from "express";
// import { getReview } from "../controllers/ai.controller.js";
import { getReview } from "../controllers/aiServices.controller.js";

const router = express.Router();

router.post("/chatbot", getReview);

export default router;
