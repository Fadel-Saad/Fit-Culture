"use client";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { useTransition } from "react";

function AddToCart({ item, cart }: { item: CartItem; cart?: Cart }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  async function handleAddToCart() {
    // Wrap the content in startTransition to implement useTransition hook
    startTransition(async () => {
      const res = await addItemToCart(item);

      // Display error toast message based on result
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // If successful
      toast(res.message, {
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
    });
    return;
  }

  async function handleRemoveFromCart() {
    // Wrap the content in startTransition to implement useTransition hook
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast(res.message);
      return;
    });
  }

  // Check if the item is in cart
  const exist =
    cart && (cart.items as CartItem[]).find((x) => x.productId === item.productId);

  // Display - and + icons if item is in cart. If not, display Add to cart btn
  return exist ? (
    <div>
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer"
        onClick={handleRemoveFromCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4  animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{exist.qty}</span>
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer"
        onClick={handleAddToCart}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full cursor-pointer" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to cart
    </Button>
  );
}

export default AddToCart;
