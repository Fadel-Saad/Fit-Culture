export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Fit Culture";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern store built with Next.js, ShadCN, and Prisma";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const DEFAULT_PAYMENT_METHOD = "CashOnDelivery";

export const PAYMENT_METHODS = ["CashOnDelivery", "WhishMoney"];

// order history number of orders
export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;
