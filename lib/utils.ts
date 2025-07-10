import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Decimal from "decimal.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert prisma object to regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// format number with decimals
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format Errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  if (error.name === "ZodError") {
    // Handle Zod error
    // get the error message of each error type by putting them in an array
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const message = error.errors[field].message;
      return typeof message === "string" ? message : JSON.stringify(message);
    });
    // join the messages into a string with a seperator
    return fieldErrors.join(". ");
  } else if (error.name === "PrismaClientKnownRequestError" && error.code === "P2002") {
    // Handle Prisma error
    // get the field name and capitalize the first character
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

// Round number to 2 decimal places
export function round2(value: number | string) {
  // convert to decimal for accurate precision calculations then round
  const decimalValue = new Decimal(value);
  const rounded = decimalValue.toDecimalPlaces(2);
  if (typeof value === "number") {
    return rounded.toNumber();
  } else if (typeof value === "string") {
    return rounded.toNumber();
  } else {
    throw new Error("Value is not a number or a string");
  }
}

// Format currency to US locale using the Intl.NumberFormat JS built-in constructor
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

// Formats currency using CURRENCY_FORMATTER based on input type
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return "NaN";
  }
}

// Shorten ID.
export function formatId(id: string) {
  return `..${id.substring(id.length - 6)}`;
}
/* 
  const id1 = '439dde63-541a-4cc9-891a-ffeae193abc0';
  console.log(formatId(id1)); // Expected: "..93abc0"
*/

// "Simple" fn to format DateTime, date only, and time only that are of Date type in a presentable way
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // abbreviated year name (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString("en-US", dateOptions);
  const formattedTime: string = new Date(dateString).toLocaleString("en-US", timeOptions);
  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
