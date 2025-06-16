import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

dotenv.config();

const client = new DataAPIClient(process.env.ASTRA_DB_API_TOKEN);
const db = client.db(process.env.ASTRA_DB_URL, { keyspace: "default_keyspace" });
const collection = db.collection("file_chunks");

export const insertChunk = async (chunk, embedding, metadata) => {
    return await collection.insertOne({
        chunk,
        embedding,
        metadata
    });
};

export const searchSimilarChunks = async (embedding, topK = 5) => {
    return await collection.findMany({
        vector: embedding,
        limit: topK,
        filter: {}, // optional: filter by sessionId or fileId
    });
};