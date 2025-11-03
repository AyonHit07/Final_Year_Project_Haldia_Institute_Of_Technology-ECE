import aiService from "../service/ai.service.js";
import textSummarizerService from "../service/textSummarizer.service.js"

export const aiChatBot = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await aiService(prompt);
        res.status(201).json({
            message: response
        });
    } catch (error) {
        console.error("Error in getReview:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const textSummarizer = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await textSummarizerService(prompt);
        res.status(200).json({
            summary: response
        });
    } catch (error) {
        console.error("Error in getReview:", error);
        res.status(500).send("Internal Server Error");
    }
};
