import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
// import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import summaryRoutes from './routes/summaryRoutes.js';
import { inngest } from './inngest/client.js';
import { serve } from 'inngest/express';
import { onFileUpload } from './inngest/functions/on-file-upload.js';
import { summarizeDoc } from './inngest/functions/summarize-doc.js';

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/summary', summaryRoutes);

//inngest setup
app.use(
    "/api/inngest",
    serve({ client: inngest, functions: [onFileUpload, summarizeDoc] })
);

// Health check route
app.get('/', (req, res) => {
    res.send('InsightAgent backend is running 🚀');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
});
