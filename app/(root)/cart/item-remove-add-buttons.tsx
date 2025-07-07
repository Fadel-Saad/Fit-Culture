import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader, Minus, Plus } from "lucide-react";

// Remove and Add items buttons in cart table view
function RemoveButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      className="cursor-pointer"
      variant="outline"
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = await removeItemFromCart(item.productId);

          if (!res.success) {
            toast.error(res.message);
          }
        })
      }
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Minus className="w-4 h-4" />
      )}
    </Button>
  );
}

function AddButton({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      className="cursor-pointer"
      variant="outline"
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = await addItemToCart(item);

          if (!res.success) {
            toast.error(res.message);
          }
        })
      }
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
    </Button>
  );
}

export { RemoveButton, AddButton };
