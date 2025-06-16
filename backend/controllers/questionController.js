import { generateEmbedding, askGemini } from "../utils/ai-agent.js";
import { searchSimilarChunks } from "../services/vectorStoreService.js";

export const askQuestion = async (req, res) => {
    const { question, sessionId } = req.body;

    try {
        const qEmbedding = await generateEmbedding(question);
        const results = await searchSimilarChunks(qEmbedding, 5);
        const context = results.map(r => r.chunk).join("\n\n");

        const answer = await askGemini({ question, context });
        res.json({ answer });
    } catch (err) {
        console.error("Error in askQuestion:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
};
