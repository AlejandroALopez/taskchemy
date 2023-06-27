import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Upadte a task
async function updateTask(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    const { taskId, newData } = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const tasksCollection = db.collection("tasks");

    const result = await tasksCollection.updateOne(
      {
        _id: new ObjectId(taskId),
      },
      { $set: newData }
    );

    client.close();

    res.status(201).json({ message: "Task updated successfully!" });
  }
}

export default updateTask;
