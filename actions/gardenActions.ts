import { MongoClient } from "mongodb";

// Get the seeds belonging to the user with the email passed
export async function getUserSeeds(userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const seedsCollection = db.collection("seeds");

  const seeds = await seedsCollection
    .find({
      userEmail: userEmail,
    })
    .toArray();

  client.close();
  return seeds;
}
