"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

// main nav takes in classes and html attributes to pass
function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  // Get URL path name
  const pathname = usePathname();

  const links = [
    {
      title: "Profile",
      href: "/user/profile",
    },
    {
      title: "Orders",
      href: "/user/orders",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "" : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default MainNav;
