import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn(params: any) {
      const { profile } = params;
      const mongoClient = await clientPromise;
      const db = mongoClient.db();
      const githubProfile = await db.collection('github_profiles').findOne({
        email: profile.email,
      });
      if (!githubProfile) {
        await db.collection('github_profiles').insertOne(params.profile);
        return true;
      }
      await db
        .collection('github_profiles')
        .updateOne({ email: profile.email }, { $set: params.profile });
      return true;
    },
    redirect() {
      return '/';
    },
    async session({ session, user }) {
      const mongoClient = await clientPromise;
      const db = mongoClient.db();
      const githubProfile: any = await db
        .collection('github_profiles')
        .findOne({
          email: user.email,
        });
      const account: any = await db.collection('accounts').findOne({
        userId: new ObjectId(user.id),
      });
      session.githubProfile = githubProfile;
      session.account = account;
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
