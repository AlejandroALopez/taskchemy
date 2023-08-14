import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Add a seed to the database
async function createSeed(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const seedsCollection = db.collection("seeds");

    const result = await seedsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Seed created successfully!" });
  }
}

export default createSeed;
