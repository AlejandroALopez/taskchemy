import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Delete a routine from the database given an ID
async function deleteTask(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "DELETE") {
    const { routineId } = req.query;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const routinesCollection = db.collection("routines");

    const result = await routinesCollection.deleteOne({
      _id: new ObjectId(routineId as string),
    });

    client.close();

    res.status(201).json({ message: "Routine deleted successfully!" });
  }
}

export default deleteTask;
