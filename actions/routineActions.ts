import { MongoClient } from "mongodb";

export async function getRoutinesHandler() {
  const client = await MongoClient.connect(
    process.env.MONGO_URL || ''
  );

  const db = client.db();
  const routinesCollection = db.collection("routines");

  const routines = await routinesCollection.find().toArray();

  client.close();
  return routines;
}
