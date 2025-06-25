"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState } from "react";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

function SignUpForm() {
  const [data, formAction, isPending] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  // getting callbackUrl from the seachParams using the hook below
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function SignUpButton() {
    return (
      <Button disabled={isPending} className="w-full cursor-pointer" variant="default">
        {isPending ? "Submitting..." : "Sign Up"}
      </Button>
    );
  }

  return (
    <form action={formAction}>
      {/* persisting the callbackUrl after submitting the form so it can be used on the server side when signing-in */}
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            type="text"
            defaultValue=""
            autoComplete="name"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            required
            type="email"
            defaultValue=""
            autoComplete="email"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue=""
            autoComplete="password"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="confirm password">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            required
            type="password"
            defaultValue=""
            autoComplete="confirmPassword"
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link target="_self" className="link" href="/sign-in">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
