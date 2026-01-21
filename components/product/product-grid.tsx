/**
 * Product Grid Component
 * Responsive grid layout
 */

import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductGridProps {
    products: Product[];
    lang: string;
    className?: string;
    columns?: 2 | 3 | 4;
}

export function ProductGrid({
    products,
    lang,
    className,
    columns = 4,
}: ProductGridProps) {
    const gridCols = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    };

    return (
        <div
            className={cn(
                "grid gap-x-6 gap-y-10",
                gridCols[columns],
                className
            )}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} />
            ))}
        </div>
    );
}
