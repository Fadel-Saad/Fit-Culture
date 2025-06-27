"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";

function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();

  async function handleAddToCart() {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    // If successful
    toast(`${item.name} added to cart`, {
      action: (
        <Button
          className="text-white bg-primary hover:bg-gray-800 cursor-pointer"
          onClick={() => router.push("/cart")}
          type="button"
        >
          Go To Cart
        </Button>
      ),
    });
  }

  return (
    <Button className="w-full cursor-pointer" type="button" onClick={handleAddToCart}>
      <Plus />
      Add to cart
    </Button>
  );
}

export default AddToCart;
