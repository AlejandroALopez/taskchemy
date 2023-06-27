import { MongoClient, ObjectId } from "mongodb";

export async function getTasksHandler() {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  const tasks = await tasksCollection.find().toArray();

  client.close();
  return tasks;
}

export async function getOneTaskHandler(taskId: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  const selectedTask = await tasksCollection.findOne({
    _id: new ObjectId(taskId),
  });

  client.close();
  return selectedTask;
}
