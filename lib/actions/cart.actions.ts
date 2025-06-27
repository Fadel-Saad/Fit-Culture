"use server";

import { CartItem } from "@/types";

// add item to cart
export async function addItemToCart(item: CartItem) {
  return {
    success: true,
    message: "Item added successfully",
  };
}
