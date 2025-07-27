import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authOptions as baseAuthOptions } from "@/lib/authOptions";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      await connectToDatabase();
      const user = await User.findOne({ email: credentials?.email });
      if (!user) return null;
      const valid = await bcrypt.compare(credentials!.password, user.password);
      if (!valid) return null;
      return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
    },
  }),
];

export const authOptions = {
  ...baseAuthOptions,
  providers,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 