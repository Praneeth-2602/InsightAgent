import { inngest } from '../client.js';
import File from '../../models/file.js';
import Task from '../../models/task.js';
import { summarizeDocumentAgent } from '../../utils/ai-agent.js';

export const summarizeDoc = inngest.createFunction(
    { id: 'summarize-doc' },
    { event: 'file/uploaded' },

    async ({ event, step }) => {
        const { fileId, fileType, sessionId } = event.data;

        console.log(`🧠 [summarizeDoc] Triggered for file ID: ${fileId}, type: ${fileType}`);

        if (!['pdf', 'docx'].includes(fileType)) {
            console.warn(`[summarizeDoc] Unsupported file type: ${fileType}`);
            return;
        }

        // Step 1: Fetch file
        const file = await step.run('fetch-file', async () => {
            console.log(`[summarizeDoc] Fetching file from DB: ${fileId}`);
            const doc = await File.findById(fileId);
            if (!doc) throw new Error(`File not found: ${fileId}`);
            console.log(`[summarizeDoc] File fetched: ${doc.filename}`);
            return doc;
        });

        // Step 2: Create a task for tracking
        const task = await step.run('create-summary-task', async () => {
            console.log(`[summarizeDoc] Creating task entry for summary`);
            const t = await Task.create({
                fileId: file._id,
                type: 'summary',
                status: 'processing',
                sessionId: sessionId || null
            });
            console.log(`[summarizeDoc] Task created: ${t._id}`);
            return t;
        });

        // Step 3: Run AI summarization OUTSIDE of step.run
        console.log(`[summarizeDoc] Generating summary using AI agent...`);
        let summary;
        try {
            summary = await summarizeDocumentAgent(file.parsedText);
            console.log(`[summarizeDoc] AI summarization complete`);
        } catch (err) {
            console.error(`[summarizeDoc] Summarization failed: ${err.message}`);
            await Task.findByIdAndUpdate(task._id, {
                status: 'failed',
                error: err.message
            });
            return;
        }

        // Step 4: Update DB with summary result
        await step.run('store-summary-result', async () => {
            console.log(`[summarizeDoc] Saving summary to DB`);
            const [taskUpdate, fileUpdate] = await Promise.all([
                Task.findByIdAndUpdate(task._id, {
                    status: 'completed',
                    result: summary
                }),
                File.findByIdAndUpdate(file._id, {
                    summary
                })
            ]);
            console.log(`[summarizeDoc] Task and file updated successfully`);
        });
    }
);
