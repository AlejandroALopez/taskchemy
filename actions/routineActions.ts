import { MongoClient, ObjectId } from "mongodb";

export async function getRoutinesHandler(userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const routinesCollection = db.collection("routines");

  const routines = await routinesCollection
    .find({
      userEmail: userEmail,
    })
    .toArray();

  client.close();
  return routines;
}

export async function getOneRoutineHandler(
  routineId: string,
  userEmail: string
) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const routinesCollection = db.collection("routines");

  const selectedRoutine = await routinesCollection.findOne({
    _id: new ObjectId(routineId),
    userEmail: userEmail,
  });

  client.close();
  return selectedRoutine;
}
