"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListingGalleryProps {
  images:     string[];
  title:      string;
}

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const show = images.slice(0, 5);

  return (
    <>
      {/* Grid */}
      <div className={cn(
        "grid gap-2 rounded-2xl overflow-hidden",
        show.length === 1 ? "grid-cols-1" :
        show.length === 2 ? "grid-cols-2" :
                            "grid-cols-4 grid-rows-2"
      )}>
        {show.map((src, i) => (
          <div
            key={i}
            onClick={() => setLightboxIndex(i)}
            className={cn(
              "relative cursor-pointer overflow-hidden group",
              show.length >= 3 && i === 0 ? "col-span-2 row-span-2" : "",
              "aspect-video"
            )}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {i === 4 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-lg">
                +{images.length - 5} photos
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full">
            <X size={24} />
          </button>
          <button
            onClick={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
            disabled={lightboxIndex === 0}
            className="absolute left-4 text-white p-2 hover:bg-white/20 rounded-full disabled:opacity-30"
          >
            <ChevronLeft size={32} />
          </button>
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={images[lightboxIndex]}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={() => setLightboxIndex(Math.min(images.length - 1, lightboxIndex + 1))}
            disabled={lightboxIndex === images.length - 1}
            className="absolute right-4 text-white p-2 hover:bg-white/20 rounded-full disabled:opacity-30"
          >
            <ChevronRight size={32} />
          </button>
          <p className="absolute bottom-4 text-white text-sm">{lightboxIndex + 1} / {images.length}</p>
        </div>
      )}
    </>
  );
}
