"use client";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";

export default function AutoSlideCarousel() {
  const { slides } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel className="w-full overflow-hidden bg-gray-200 sm:rounded-lg">
      <CarouselContent style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: "transform 0.5s ease-in-out" }} className="flex items-center">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="basis-full">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-8">
              <div>
                <h3 className="text-orange-500">Hurry up only few lefts!</h3>
                <p className="sm:max-w-lg mt-4 text-lg sm:text-2xl font-semibold sm:font-bold">{slide.text}</p>
                <div className="flex items-center gap-5 py-8">
                  <Link href={'/all-products'} className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-1 sm:p-2 cursor-pointer">Shope Now</Link>
                  <Link href={'/'} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    Explore
                    <FaLongArrowAltRight />
                  </Link>
                </div>
              </div>
              <Image src={slide.image} alt={`Slide ${index + 1}`} width={300} height={300} className="rounded-lg" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
