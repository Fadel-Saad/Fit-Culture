import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
};

async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  // get the callbackUrl from searchParams prop provided by Nesxt.js that parses it from a url that has a callback url parameter
  const { callbackUrl } = await searchParams;

  // get session status and redirect to homepage after signing in or to callback url if available
  const session = await auth();
  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-2">
          <Link href="/" className="flex-center w-fit mx-auto">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              width={100}
              height={100}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default SignInPage;
