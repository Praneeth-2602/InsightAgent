import express from 'express';
import {
    getSummaryByFileId,
    getSummaryStatus,
    retrySummary,
    listAllSummaries,
    deleteSummaryByFileId
} from '../controllers/summaryController.js';

const router = express.Router();

// Get summary for a specific file
router.get('/:fileId', getSummaryByFileId);

// Get task status for summary generation
router.get('/status/:fileId', getSummaryStatus);

// Retry summary generation for a failed or stuck file
router.post('/retry/:fileId', retrySummary);

// List all summaries (admin/dashboard/debug use)
router.get('/', listAllSummaries);

// Delete summary and its related tasks
router.delete('/:fileId', deleteSummaryByFileId);

export default router;
