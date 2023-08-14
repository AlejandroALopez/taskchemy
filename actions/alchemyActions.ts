import { MongoClient } from "mongodb";

// Get the stats of a user given their email (e.g. coins)
export async function getUserStats(userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const statsCollection = db.collection("stats");

  const stats = await statsCollection
    .findOne({
      userEmail: userEmail,
    })

  client.close();
  return stats;
}

// Get the lab object of a user given their email (e.g. coins)
export async function getUserLab(userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const labsCollection = db.collection("labs");

  const lab = await labsCollection
    .findOne({
      userEmail: userEmail,
    })

  client.close();
  return lab;
}
