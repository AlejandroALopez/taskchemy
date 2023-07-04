import { MongoClient } from "mongodb";

export async function signIn(credentials: any) {
  if (!credentials || !credentials.email || !credentials.password) return null;

  const client = await MongoClient.connect(process.env.MONGO_URL || "");
  const db = client.db();
  const usersCollection = db.collection("users");

  const dbUser = await usersCollection.findOne({
    email: credentials.email,
  });

  client.close();

  // verify password and return user without it
  if (dbUser && dbUser.password === credentials.password) {
    const { password, createdAt, _id, ...dbUserWithoutPassword } = dbUser;
    return dbUserWithoutPassword;
  }
  return null;
}
