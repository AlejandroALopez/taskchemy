import { MongoClient, ObjectId } from "mongodb";

export async function getTagsHandler(userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tagsCollection = db.collection("tags");

  const tags = await tagsCollection.find({
    userEmail: userEmail
  }).toArray();

  client.close();
  return tags;
}

export async function getOneTagHandler(tagId: string, userEmail: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tagsCollection = db.collection("tags");

  const selectedTag = await tagsCollection.findOne({
    _id: new ObjectId(tagId),
    userEmail: userEmail
  });

  client.close();
  return selectedTag;
}
