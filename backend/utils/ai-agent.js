import { createAgent, gemini } from "@inngest/agent-kit";
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
dotenv.config();

const ai = createAgent({
    model: gemini({
        model: "gemini-1.5-flash",
        apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "InsightAgent",
    system: `
You are InsightAgent, a helpful, multimodal research assistant. 
You provide summaries, answer questions, and extract insights from uploaded content such as documents, images, and audio. 
Your goal is to be concise, clear, and context-aware. You always base your answers strictly on the given content. 
If the content is insufficient to answer, say: "I need more context to answer that accurately."
`,
});

// 👇 Used for summarization after upload
export async function summarizeDocumentAgent(text) {
    const prompt = `
You are a document analysis assistant. Read the following document and write a **detailed summary** in paragraph form. 
If the document contains chapters, generate the summary as summaries of each chapter. 
Don't use bullet points or subheadings. Focus on key ideas, conclusions, and names mentioned.

Document:
"""
${text}
"""
`;

    const response = await ai.run(prompt);
    const output = response?.output?.[0]?.content;

    if (!output) throw new Error("Failed to generate summary");

    return output.trim();
}

// 👇 Used when user asks a question based on chunks from Astra DB
export async function askGemini({ question, context }) {
    const prompt = `
You are an AI assistant answering a user's question using the provided document context.
Only use the given context to answer. If the answer isn't present, say so.

Question:
"${question}"

Context:
"""
${context}
"""
`;

    const response = await ai.run(prompt);
    const output = response?.output?.[0]?.content;

    if (!output) throw new Error("Failed to generate answer");

    return output.trim();
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function generateEmbedding(text) {
    if (!text || typeof text !== 'string') {
        throw new Error('Invalid input text for embedding.');
    }

    try {
        const embeddingModel = genAI.getGenerativeModel({ model: 'embedding-001' });

        const result = await embeddingModel.embedContent({
            content: { parts: [{ text }] },
        });

        const embedding = result.embedding.values;
        return embedding;
    } catch (err) {
        console.error('❌ Error generating embedding:', err.message || err);
        throw new Error('Embedding generation failed');
    }
}
