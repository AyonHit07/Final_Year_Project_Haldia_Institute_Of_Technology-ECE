import axios from "axios";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiResponse = async (prompt) => {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${apiKey}`,
            {
                contents: [{ parts: [{ text: prompt }] }],
            }
        );
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, something went wrong.";
    }
};
