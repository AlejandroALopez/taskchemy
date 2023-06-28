import { MongoClient, ObjectId } from "mongodb";

export async function getTagsHandler() {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tagsCollection = db.collection("tags");

  const tags = await tagsCollection.find().toArray();

  client.close();
  return tags;
}

export async function getOneTagHandler(tagId: string) {
  const client = await MongoClient.connect(process.env.MONGO_URL || "");

  const db = client.db();
  const tagsCollection = db.collection("tags");

  const selectedTag = await tagsCollection.findOne({
    _id: new ObjectId(tagId),
  });

  client.close();
  return selectedTag;
}
