"use client";

import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order.actions";
import { Loader, Check } from "lucide-react";

function PlaceOrderForm() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const res = await createOrder();

    // redirect to the suitable page
    if (res.redirectTo) router.push(res.redirectTo);
  }

  function PlaceOrderButton() {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full cursor-pointer">
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}{" "}
        Place Order
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
}

export default PlaceOrderForm;
