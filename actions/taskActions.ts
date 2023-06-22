import { MongoClient } from "mongodb";

export async function getTasksHandler() {
  const client = await MongoClient.connect(
    process.env.MONGO_URL || ''
  );

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  const tasks = await tasksCollection.find().toArray();

  client.close();
  return tasks;
}
