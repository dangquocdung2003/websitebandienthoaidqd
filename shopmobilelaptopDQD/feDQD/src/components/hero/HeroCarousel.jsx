import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import { HERO_SLIDES } from "@/data/heroSlides";
HERO_SLIDES.sort(() => Math.random() - 0.5);


export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const total = HERO_SLIDES.length;

  // tự động chuyển slide
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const go = (dir) => {
    setIndex((i) => (i + dir + total) % total);
  };

  const slide = HERO_SLIDES[index];

  return (
    <section className="relative isolate">
      <div className="relative h-[560px] w-full overflow-hidden bg-black">
        {/* Ảnh nền */}
        <img
          src={slide.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />

        {/* overlay tối nhẹ để chữ nổi bật */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Nội dung */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-sm tracking-widest text-gray-200">
              {slide.titleTop}
            </p>
            <h1 className="whitespace-pre-line text-6xl font-extrabold leading-[1.1]">
              {slide.titleMain}
            </h1>
            <div className="mt-8">
              <Button className="bg-transparent text-white hover:bg-white hover:text-gray-900">
                {slide.cta.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>

        {/* Nút điều hướng */}
        <button
          onClick={() => go(-1)}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/30"
          aria-label="Slide trước"
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur hover:bg-white/30"
          aria-label="Slide sau"
        >
          ›
        </button>
      </div>
    </section>
  );
}
