import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

// Add a user to the database
async function createUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.MONGO_URL || "");

    const db = client.db();
    const usersCollection = db.collection("users");

    // Verify that email does not exist on database
    const usersWithEmail = await usersCollection.find({email: data.email}).toArray();
    if (usersWithEmail.length > 0){ 
      res.status(409).json({ message: "This email is already registered!" });
      client.close();
      return;
    }

    const result = await usersCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "User created successfully!" });
  }
}

export default createUser;
