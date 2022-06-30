import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectID } from 'mongodb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import clientPromise from '../../../../lib/mongodb';
import { GetUserFromUserIdService } from '../../../services/github/GetUserFromUserIdService';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      const mongoClient = await clientPromise;
      const db = mongoClient.db();
      const userId = new ObjectID(user.id);
      const account = await db.collection('accounts').findOne({
        userId,
      });

      const getUserFromUserId = new GetUserFromUserIdService(
        account?.access_token,
      );

      const githubUser = await getUserFromUserId.execute(
        account?.providerAccountId || 0,
      );

      session.user = {
        ...user,
      };
      session.githubUser = {
        ...githubUser,
        github_access_token: account?.access_token,
      };
      return session;
    },
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
