import File from '../models/file.js';
import Task from '../models/task.js';
import { inngest } from '../inngest/client.js';
import { v4 as uuidv4 } from 'uuid';

// GET /api/summary/:fileId
export const getSummaryByFileId = async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await File.findById(fileId);
        if (!file) return res.status(404).json({ error: 'File not found' });

        res.json({
            fileId,
            summary: file.summary || null,
            parsedText: file.parsedText || null,
        });
    } catch (err) {
        console.error('[getSummaryByFileId]', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// GET /api/summary/status/:fileId
export const getSummaryStatus = async (req, res) => {
    try {
        const { fileId } = req.params;

        const task = await Task.findOne({ fileId, type: 'summary' }).sort({ createdAt: -1 });

        if (!task) return res.status(404).json({ error: 'No summarization task found' });

        res.json({
            status: task.status,
            result: task.result || null,
            error: task.error || null,
        });
    } catch (err) {
        console.error('[getSummaryStatus]', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// POST /api/summary/retry/:fileId
export const retrySummary = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findById(fileId);
        if (!file) return res.status(404).json({ error: 'File not found' });

        // Re-trigger Inngest manually
        await inngest.send({
            name: 'file/uploaded',
            data: { fileId, fileType: file.fileType }
        });

        res.json({ message: 'Retry initiated successfully' });
    } catch (err) {
        console.error('[retrySummary]', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// GET /api/summary
export const listAllSummaries = async (req, res) => {
    try {
        const files = await File.find().sort({ createdAt: -1 });
        res.json(files);
    } catch (err) {
        console.error('[listAllSummaries]', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// DELETE /api/summary/:fileId
export const deleteSummaryByFileId = async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await File.findByIdAndDelete(fileId);
        const tasks = await Task.deleteMany({ fileId });

        if (!file) return res.status(404).json({ error: 'File not found' });

        res.json({ message: 'Summary and tasks deleted successfully' });
    } catch (err) {
        console.error('[deleteSummaryByFileId]', err);
        res.status(500).json({ error: 'Server error' });
    }
};
