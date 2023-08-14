import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Upadte the stats of a user (e.g. update number of coins after buying a seed)
async function updateStats(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    const { statsId, newData } = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const statsCollection = db.collection("stats");

    const result = await statsCollection.updateOne(
      {
        _id: new ObjectId(statsId),
      },
      { $set: newData }
    );

    client.close();

    res.status(201).json({ message: "Stats updated successfully!" });
  }
}

export default updateStats;
