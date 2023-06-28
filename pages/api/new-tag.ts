import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Add a tag to the database
async function createTag(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const tagCollection = db.collection("tags");

    const result = await tagCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Tag created successfully!" });
  }
}

export default createTag;
