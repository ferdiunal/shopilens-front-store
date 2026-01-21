/**
 * Category Cards Component
 */

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types";

interface CategoryCardsProps {
    lang: string;
    dict: Dictionary;
    categories: string[];
}

const categoryImages: Record<string, string> = {
    electronics:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
    jewelery:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    "men's clothing":
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
    "women's clothing":
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
};

export function CategoryCards({ lang, dict, categories }: CategoryCardsProps) {
    // Kategori isimlerini çevir
    const translateCategory = (category: string): string => {
        const key = category.replace("'s ", "_").replace(" ", "_").toLowerCase();
        return dict.categories[key as keyof typeof dict.categories] || category;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category) => (
                <Link
                    key={category}
                    href={`/${lang}/products?category=${encodeURIComponent(category)}`}
                    className="group relative overflow-hidden rounded-xl aspect-[16/9] md:aspect-[3/2]"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                            backgroundImage: `url("${categoryImages[category] || categoryImages.electronics}")`,
                        }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                    {/* Label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold text-xl tracking-wide uppercase">
                            {translateCategory(category)}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
