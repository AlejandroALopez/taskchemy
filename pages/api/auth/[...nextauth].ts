import { MongoClient } from "mongodb";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const client = await MongoClient.connect(process.env.MONGO_URL || "");
        const db = client.db();
        const usersCollection = db.collection("users");

        const dbUser = await usersCollection.findOne({
          email: credentials.email,
        });

        if (dbUser) {
          if (dbUser && dbUser.password === credentials.password) {
            const { password, createdAt, _id, ...dbUserWithoutPassword } = dbUser;
            return dbUserWithoutPassword as User;
          } else return null;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
