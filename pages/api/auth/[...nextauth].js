import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: true,
  //     },
  //   },
  // },
  pages: {
    signIn: '/auth',
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'a@a.com' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');
        //find the if there is a user with this email
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('User not found');
        }
        //if user is found in the database
        if (user) {
          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );
          //Password invalid
          if (!isValid) {
            client.close();
            throw new Error('Wrong password');
          }
          client.close();
          return { email: user.email };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { encyrption: true },
  // database: process.env.MONGODB_URI,
  session: { jwt: true, maxAge: 24 * 60 * 60 },
});
