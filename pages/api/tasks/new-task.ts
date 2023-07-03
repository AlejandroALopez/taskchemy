import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Add a task to the database
async function createTask(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const tasksCollection = db.collection("tasks");

    const result = await tasksCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Task created successfully!" });
  }
}

export default createTask;
