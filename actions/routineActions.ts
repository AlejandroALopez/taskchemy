import { MongoClient, ObjectId } from "mongodb";

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

export async function getOneRoutineHandler(routineId: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const routinesCollection = db.collection("routines");

  const selectedRoutine = await routinesCollection.findOne({
    _id: new ObjectId(routineId),
  });

  client.close();
  return selectedRoutine;
}
