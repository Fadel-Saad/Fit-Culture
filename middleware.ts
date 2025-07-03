// export authorized fn in authConfig to use its logic(code) it as a middleware by Next.js which will run before requests reach the API routes or pages

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);
