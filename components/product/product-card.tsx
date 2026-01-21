"use client";

/**
 * Product Card Component
 * Hover efektli ürün kartı, badge desteği, quick-add button
 */

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
    product: Product;
    lang: string;
    className?: string;
    showQuickAdd?: boolean;
}

export function ProductCard({
    product,
    lang,
    className,
    showQuickAdd = true,
}: ProductCardProps) {
    // Badge belirleme
    const getBadge = () => {
        if (product.id <= 3) return { variant: "new" as const, label: "New" };
        if (product.price < 50) return { variant: "sale" as const, label: "Sale" };
        return null;
    };

    const badge = getBadge();

    return (
        <div className={cn("group flex flex-col gap-4", className)}>
            {/* Image Container */}
            <Link
                href={`/${lang}/products/${product.id}`}
                className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary"
            >
                {/* Badge */}
                {badge && (
                    <div className="absolute left-3 top-3 z-10">
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                    </div>
                )}

                {/* Favorite Button */}
                <button className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-all hover:bg-background hover:text-destructive opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-300">
                    <Heart className="size-5" />
                </button>

                {/* Image */}
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Quick Add (Desktop) */}
                {showQuickAdd && (
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <Button
                            variant="secondary"
                            className="w-full bg-background shadow-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Add to cart logic
                            }}
                        >
                            <ShoppingCart className="size-4" />
                            Quick Add
                        </Button>
                    </div>
                )}
            </Link>

            {/* Info */}
            <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                    <Link href={`/${lang}/products/${product.id}`}>
                        <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                            {product.title}
                        </h3>
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground truncate">
                        {product.category}
                    </p>
                </div>
                <p className="font-bold text-foreground">
                    {formatPrice(product.price)}
                </p>
            </div>
        </div>
    );
}
