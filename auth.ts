import NextAuth, { type DefaultSession } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";


const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "john.doe" },
    password: {  label: "Password", type: "password" }
  },
  async authorize(credentials, req) {
    // Add logic here to look up the user from the credentials supplied
    const user = {
      id: "1",
      name: "Test User",
      email: "john.doe@example.com"      
    }

    if (user) {
      // Any object returned will be saved in `user` property of the JWT
      return user
    } else {
      // If you return null then an error will be displayed advising the user to check their details.
      return null

      // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    }
  }
})

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  trustHost: true,
  providers: [credentialsProvider],
  callbacks: {
    jwt({ token, profile, user }) {
      if (profile) {
        token.id = profile.id        
        token.image = generateProfileImage(profile.avatar_url || profile.picture)
      }

      if (user) {
        token.id = user.id
        token.image = generateProfileImage(user.image)
      }
      return token
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      
      return session
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  // pages: {
  //   signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  // }
})


const generateProfileImage = (url: string|null|undefined) => {
  if (url) return url;

  // use boring avatar service
  return `https://boringavatars.com/avatars/beam/${Math.random() * 1000}.svg`  
}