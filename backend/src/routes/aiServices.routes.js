import express from "express";
// import { getReview } from "../controllers/ai.controller.js";
import { aiChatBot, textSummarizer } from "../controllers/aiServices.controller.js";

const router = express.Router();

router.post("/chatbot", aiChatBot);
router.post("/text-summarizer", textSummarizer);

export default router;
