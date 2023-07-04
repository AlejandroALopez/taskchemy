import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data:
    | {
        [key: string]: any;
        _id: ObjectId;
      }
    | undefined;
};

// Sign in with email and password
async function signIn(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);

    const client = await MongoClient.connect(process.env.MONGO_URL || "");
    const db = client.db();
    const usersCollection = db.collection("users");

    const dbUser = await usersCollection.findOne({
      email: email,
    });

    client.close();

    if (!dbUser) {
      res.status(201).json({ message: "Error", data: undefined });
    } else if (dbUser && dbUser.password === password) {
      // verify password
      const { password, createdAt, ...dbUserWithoutPassword } = dbUser;
      res
        .status(201)
        .json({ message: "Logged in", data: dbUserWithoutPassword });
    } else {
      res.status(201).json({ message: "Error", data: undefined });
    }
  }
}

export default signIn;
