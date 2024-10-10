import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);
console.log(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  "----------------------------"
);
export { handler as GET, handler as POST };
