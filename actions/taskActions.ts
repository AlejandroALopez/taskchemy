import { MongoClient } from "mongodb";

export async function getTasksHandler() {
  const client = await MongoClient.connect(
    "mongodb+srv://alejandrolopez:jhPgrzfvAoYyBRrk@cluster0.u1ufu2p.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  const tasks = await tasksCollection.find().toArray();

  client.close();
  return tasks;
}
