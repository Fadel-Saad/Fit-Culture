"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

function ProductCarousel({ data }: { data: Product[] }) {
  return (
    <Carousel
      className="w-full mb-12"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
          stopOnMouseEnter: false,
        }),
      ]}
    >
      <CarouselContent className="max-h-[351px]">
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto">
                <Image
                  alt={product.name}
                  src={product.banner!}
                  width="0"
                  height="0"
                  sizes="100"
                  className="w-full max-h-[351px] object-cover"
                />
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className=" bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white">
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
}

export default ProductCarousel;
