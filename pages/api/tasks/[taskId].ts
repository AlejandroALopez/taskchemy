import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Delete a task from the database given an ID
async function deleteTask(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "DELETE") {
    const { taskId } = req.query;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const tasksCollection = db.collection("tasks");

    const result = await tasksCollection.deleteOne({
      _id: new ObjectId(taskId as string),
    });

    client.close();

    res.status(201).json({ message: "Task deleted successfully!" });
  }
}

export default deleteTask;
