import React from "react";
import { cn } from "@/lib/utils";

function CheckoutSteps({ current = 0 }) {
  const steps = ["User Login", "Shipping Address", "Payment Method", "Place Order"];

  return (
    <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={cn(
              "p-2 w-56 rounded-full text-sm text-center",
              index === current ? "bg-secondary" : ""
            )}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <hr className="w-16 border-t  border-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CheckoutSteps;
