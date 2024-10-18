import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from 'next-auth/providers/github';
import { connection2DB } from '@utils/database';
import User from "@models/user";

//#we are using Next-auth for authentication
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),
        // GitHubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
        // })
    ],
    callbacks: {
        async session({ session }) {
            try {
                await connection2DB();
                const sessionUser = await User.findOne({
                    email: session.user.email
                })
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
                return session;
            } catch (err) {
                console.error("Error in session callback", err);
                return session;
            }

        },
        async signIn({ profile }) {
            try {
                await connection2DB();
                // check if the user is already signin
                const userExists = await User.findOne({
                    email: profile.email
                });
                //if not then create a user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
})
export { handler as GET, handler as POST }