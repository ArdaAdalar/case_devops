import { MongoClient } from "mongodb";

//const connectionString = process.env.ATLAS_URI || "mongodb://127.0.0.1:27017";
//const client = new MongoClient(connectionString);

const connectionString = process.env.ATLAS_URI || "mongodb://root:example@mongodb:27017/admin";
const client = new MongoClient(connectionString);


let db;

export async function connectToDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    const conn = await client.connect();
    console.log("Successfully connected to MongoDB.");
    db = conn.db("sample_training"); // Veritabanını burada tanımlıyoruz
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
}

