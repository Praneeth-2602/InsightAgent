import File from '../models/file.js';
import { inngest } from '../inngest/client.js';
import parseFile from '../utils/fileParser.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const uploadedFile = req.files.file;
        const sessionId = req.body.sessionId || uuidv4();
        // Refine fileType for PDFs to be more specific
        let fileType = uploadedFile.mimetype.split('/')[0];
        if (uploadedFile.mimetype === 'application/pdf') {
            fileType = 'pdf';
        }

        // Parse the file contents using utility function
        const parsedText = await parseFile(uploadedFile);

        // Save metadata to MongoDB
        const fileDoc = await File.create({
            filename: uploadedFile.name,
            originalName: uploadedFile.name,
            fileType,
            sessionId,
            parsedText
        });

        console.log(`[uploadFile] File uploaded successfully: ${fileDoc._id}`);
        
        // Trigger background processing with Inngest
        await inngest.send({
            name: `file/uploaded`,
            data: {
                fileId: fileDoc._id,
                fileType,
                sessionId
            }
        });

        res.status(200).json({ message: 'File uploaded and processing started', fileId: fileDoc._id });
    } catch (err) {
        console.error('[uploadFile]', err);
        res.status(500).json({ message: 'Server error while uploading file' });
    }
};
