import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Add a routine to the database
async function createRoutine(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const routinesCollection = db.collection("routines");

    const result = await routinesCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Routine created successfully!" });
  }
}

export default createRoutine;
