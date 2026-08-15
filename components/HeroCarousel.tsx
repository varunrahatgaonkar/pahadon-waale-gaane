"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function HeroCarousel() {
  const [images, setImages] = useState<string[]>(["/scene.png"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all images present in public/ and public/hero/
  useEffect(() => {
    fetch("/api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }
      })
      .catch(() => {
        // Fallback to scene.png
      });
  }, []);

  // Cycle through images automatically
  useEffect(() => {
    if (images.length <= 1) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full animate-slow-drift origin-center pointer-events-none z-0"
    >
      {images.map((imgSrc, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={imgSrc}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={imgSrc}
              alt="Pahado Wale Gaane - Mountain Scene"
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
            />
          </div>
        );
      })}
    </div>
  );
}
