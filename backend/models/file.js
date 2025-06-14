import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalName: String,
    fileType: {
        type: String,
        enum: ['pdf', 'image', 'audio', 'video', 'docx'],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    sessionId: {
        type: String
    },
    parsedText: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        default: null
    },
    sourceUrl: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // auto-delete after 1 hour
    }
});

export default mongoose.model('File', fileSchema);
