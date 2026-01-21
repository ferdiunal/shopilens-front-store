"use client";

/**
 * Product Gallery Component
 * Thumbnail navigation, main image, zoom effect
 */

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
    images: string[];
    title: string;
    badge?: string;
}

export function ProductGallery({ images, title, badge }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Eğer tek resim varsa, 4 kez tekrarla
    const displayImages = images.length === 1
        ? [images[0], images[0], images[0], images[0]]
        : images;

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar shrink-0">
                {displayImages.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                            "relative size-20 lg:size-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all",
                            selectedIndex === index
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-transparent hover:border-muted-foreground/30 opacity-70 hover:opacity-100"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`${title} - ${index + 1}`}
                            fill
                            className="object-contain p-2"
                            sizes="96px"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative rounded-xl overflow-hidden bg-secondary aspect-square lg:aspect-[4/5] group cursor-zoom-in">
                {badge && (
                    <div className="absolute top-4 right-4 z-10">
                        <Badge variant="new">{badge}</Badge>
                    </div>
                )}
                <Image
                    src={displayImages[selectedIndex]}
                    alt={title}
                    fill
                    className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                />
            </div>
        </div>
    );
}
