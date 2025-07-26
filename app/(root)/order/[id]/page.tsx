import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Order Details",
};

async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAddress,
        }}
        isAdmin={session?.user.role === "admin" || false}
      />
    </>
  );
}

export default OrderDetailsPage;
