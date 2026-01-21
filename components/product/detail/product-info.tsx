"use client";

/**
 * ProductInfo Component
 * Ürün başlığı ve favori butonu
 */

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    title: string;
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
    className?: string;
}

export function ProductInfo({
    title,
    isFavorite = false,
    onFavoriteToggle,
    className,
}: ProductInfoProps) {
    return (
        <div className={cn("flex justify-between items-start gap-4", className)}>
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-foreground">
                {title}
            </h1>
            <button
                onClick={onFavoriteToggle}
                className={cn(
                    "p-2 rounded-full transition-colors shrink-0",
                    "hover:bg-accent",
                    isFavorite
                        ? "text-destructive"
                        : "text-muted-foreground hover:text-destructive"
                )}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                <Heart
                    className={cn("size-6", isFavorite && "fill-current")}
                />
            </button>
        </div>
    );
}
