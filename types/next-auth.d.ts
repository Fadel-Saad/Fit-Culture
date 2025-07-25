import { DefaultSession } from "next-auth";

// extending the default session to define a user role and keep rest properties the same
declare module "next-auth" {
  export interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}
