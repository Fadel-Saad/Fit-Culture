"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "../ui/button";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

function Pagination({ page, totalPages, urlParamName }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  function handlePagination(btnType: string) {
    const newPage =
      btnType === "next" ? (Number(page) + 1).toString() : (Number(page) - 1).toString();

    // Get search params string and set the page to the new value
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);

    router.push(`${pathName}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handlePagination("prev")}
        size="lg"
        variant="outline"
        className="w-28 cursor-pointer"
        disabled={Number(page) <= 1}
      >
        Previous
      </Button>
      <Button
        onClick={() => handlePagination("next")}
        size="lg"
        variant="outline"
        className="w-28 cursor-pointer"
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
