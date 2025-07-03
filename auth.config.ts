/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

// This auth config file is implemented to fix the issue of auth.ts used as
// a middleware to run on edge runtime environments like in vercel

export const authConfig = {
  providers: [],
  callbacks: {
    // use the authorized callback which will run on every page
    authorized({ request, auth }: any) {
      // check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        // generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        // create new response and add the new headers, then move to the next
        // middleware or API route/page
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        // set the newly generated sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;
