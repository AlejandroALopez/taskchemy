import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Delete a seed from the database given an ID. To be called when collecting a plant from the garden
async function deleteSeed(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "DELETE") {
    const { seedId } = req.query;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const seedsCollection = db.collection("seeds");

    const result = await seedsCollection.deleteOne({
      _id: new ObjectId(seedId as string),
    });

    client.close();

    res.status(201).json({ message: "Seed deleted successfully!" });
  }
}

export default deleteSeed;
