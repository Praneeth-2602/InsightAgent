import { Inngest } from 'inngest';
import dotenv from 'dotenv';

dotenv.config();

// Create and export the Inngest client
export const inngest = new Inngest({
    id: 'insightagent-backend',
    eventKey: process.env.INNGEST_EVENT_KEY, 
});
