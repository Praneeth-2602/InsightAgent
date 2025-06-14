import { inngest } from '../client.js';

/**
 * This function triggers an event for the uploaded file.
 * You invoke it from your upload controller after storing the file.
 */
export const onFileUpload = inngest.createFunction(
    { id: 'on-file-upload' },
    { event: 'api/file.uploaded' }, // this is your custom app-side event

    async ({ event, step }) => {
        const { fileId, fileType } = event.data;

        // You can branch here if needed — or just fire downstream steps
        await step.sendEvent('file/uploaded', {
            data: {
                fileId,
                fileType
            }
        });

        return 'Triggered summarize events for file upload';
    }
);
