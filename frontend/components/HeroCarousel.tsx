import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const shoeImages = [
  "https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/carousel/slide2.webp", // înlocuiește cu calea reală a imaginii
  "https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/carousel/slide4.webp", // înlocuiește cu calea reală a imaginii
  "https://tsdfcxskidnevhjjwcin.supabase.co/storage/v1/object/public/images/carousel/slide1.webp", // înlocuiește cu calea reală a imaginii
];

export function HeroCarousel() {
  return (
    <Carousel className='w-full lg:max-w-md mx-auto sm:max-w-xl'>
      <CarouselContent>
        {shoeImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <img
                    src={image}
                    alt={`Shoe ${index + 1}`}
                    className='object-cover w-full h-full'
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
