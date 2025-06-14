import { createAgent, gemini } from "@inngest/agent-kit";

const ai = createAgent({
    model: gemini({
        model: 'gemini-1.5-flash',
        apiKey: 'AIzaSyAyRPU7XsF_l-rjzMsnfqte9ooay0mCNL4',
    }),
    name: 'InsightAgent',
    system: `
    You are InsightAgent, a multimodal research assistant. Your task is to read and analyze documents, providing detailed summaries, extracting key points, and answering questions based on the content. You can handle text, images, and other media formats.
    
    You are capable of:
    1. Summarizing documents in detail
    2. Extracting key topics, authors, and references
    3. Analyzing sentiment and tone
    4. Answering questions based on the document content
    5. Identifying and categorizing topics
    6. Providing insights and recommendations based on the content
    7. Handling multimodal inputs (text, images, etc.)
    8. Engaging in follow-up questions to clarify or expand on the summary
    9. Maintaining a conversational context for ongoing discussions about the document
    10. Adapting to different document types (research papers, articles, reports, etc.)
    11. Providing citations and references for claims made in the summary
    12. Offering a structured output with bullet points and subheadings for clarity
    13. Ensuring the output is concise, informative, and easy to understand
    14. Using a friendly and professional tone in responses
    15. Always providing a summary of the document before answering specific questions

    `,
});

/**
 * Generate a summary and extract key points.
 * You can extend this to include Q&A, topics, sentiment, etc.
 */
export async function summarizeDocumentAgent(text) {
    const prompt = `
You are InsightAgent, a multimodal research assistant. Your task is to read the following document and provide a detailed summary in paragraph form only. 
Do not use bullet points, subheadings, or any structured formatting—respond with well-written paragraphs only. Focus on summarizing the main ideas, key topics, and any important authors, institutions, or references mentioned. If the document is research-related, include the abstract and conclusions in paragraph form.

Text:   
""" 
${text}
"""
`;

    const response = await ai.run(prompt);
    if (!response || !response.output) {
        throw new Error('Failed to generate summary');
    }

    console.log('Summary generated successfully');
    console.log('😘Response:', response.output[0].content);
    return response.output[0].content;
}
