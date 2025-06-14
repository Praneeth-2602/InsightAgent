import { inngest } from '../client.js';
import File from '../../models/file.js';
import Task from '../../models/task.js';
import { summarizeDocumentAgent } from '../../utils/ai-agent.js';

export const summarizeDoc = inngest.createFunction(
    { id: 'summarize-doc' },
    { event: 'file/uploaded' },

    async ({ event, step }) => {
        const { fileId, fileType, sessionId } = event.data;

        console.log(`😂[summarizeDoc] Starting summarization for file ID: ${fileId}, type: ${fileType}`);

        if (!['pdf', 'docx'].includes(fileType)) {
            console.warn(`[summarizeDoc] Skipping unsupported file type: ${fileType}`);
            return;
        }

        // Step 1: Fetch the file
        const file = await step.run('fetch-file', async () => {
            console.log(`[summarizeDoc] Fetching file with ID: ${fileId}`);
            const found = await File.findById(fileId);
            if (!found) throw new Error(`File not found for ID: ${fileId}`);
            console.log(`[summarizeDoc] File fetched successfully`);
            return found;
        });

        // Step 2: Create a task
        const task = await step.run('create-summary-task', async () => {
            console.log(`[summarizeDoc] Creating summary task for file: ${file._id}`);
            const created = await Task.create({
                fileId: file._id,
                type: 'summary',
                status: 'processing',
                sessionId: sessionId || null,
            });
            console.log(`[summarizeDoc] Task created with ID: ${created._id}`);
            return created;
        });

        // ❌ Don't call summarizeDocumentAgent inside a step
        console.log(`[summarizeDoc] Summarizing file content using AI agent...`);
        const summary = await summarizeDocumentAgent(file.parsedText);
        console.log(`[summarizeDoc] Summary generated`);

        // Step 3: Save summary to DB
        await step.run('save-summary-to-db', async () => {
            console.log(`[summarizeDoc] Updating DB with summary`);
            await Task.findByIdAndUpdate(task._id, {
                status: 'completed',
                result: summary,
            });

            await File.findByIdAndUpdate(file._id, {
                summary,
            });
            console.log(`[summarizeDoc] DB updated`);
        });
    }
);
