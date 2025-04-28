'use client'

import { JSX, useState, useEffect } from "react";

import { Title } from "./title";
import { Carousel, CarouselApi, CarouselItem, CarouselContent } from "../../ui/carousel"

interface Gallery6Props {
  title: string
  items?: JSX.Element[]
}

export const Gallery = ({
  title,
  items = []
}: Gallery6Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  console.log(canScrollPrev)
  console.log(canScrollNext)
  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return (
    <section>
      <Title title={title}/>
      <div className="w-full">
        <Carousel
          className="relative"
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.key} className="pl-4 md:max-w-[150px]">
                {item}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};