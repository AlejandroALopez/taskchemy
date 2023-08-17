import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Upadtes the lab of a user (e.g. plant obtained, recipe discovered)
async function updateUserLab(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    const { labId, newData } = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const lasbCollection = db.collection("labs");

    const result = await lasbCollection.updateOne(
      {
        _id: new ObjectId(labId),
      },
      { $set: newData }
    );

    client.close();

    res.status(201).json({ message: "Lab updated successfully!" });
  }
}

export default updateUserLab;
