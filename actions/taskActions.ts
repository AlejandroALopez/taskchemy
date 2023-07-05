import { MongoClient, ObjectId } from "mongodb";

export async function getTasksHandler(userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  const tasks = await tasksCollection
    .find({
      userEmail: userEmail,
    })
    .toArray();

  client.close();
  return tasks;
}

export async function getOneTaskHandler(taskId: string, userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tasksCollection = db.collection("tasks");

  const selectedTask = await tasksCollection.findOne({
    _id: new ObjectId(taskId),
    userEmail: userEmail,
  });

  client.close();
  return selectedTask;
}
