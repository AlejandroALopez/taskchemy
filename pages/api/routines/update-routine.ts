import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Upadte a routine
async function updateRoutine(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    const { routineId, newData } = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const routinesCollection = db.collection("routines");

    const result = await routinesCollection.updateOne(
      {
        _id: new ObjectId(routineId),
      },
      { $set: newData }
    );

    client.close();

    res.status(201).json({ message: "Routine updated successfully!" });
  }
}

export default updateRoutine;
