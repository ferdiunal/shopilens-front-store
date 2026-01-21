"use client";

/**
 * ProductActions Component
 * Miktar kontrolü ve Sepete Ekle butonu
 */

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantityInput } from "@/components/product/quantity-input";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductActionsProps {
    product: Product;
    addToCartLabel: string;
    onAddToCart?: (product: Product, quantity: number) => void;
    className?: string;
}

export function ProductActions({
    product,
    addToCartLabel,
    onAddToCart,
    className,
}: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart?.(product, quantity);
    };

    return (
        <div className={cn("flex flex-col sm:flex-row gap-4", className)}>
            <QuantityInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
            />
            <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 h-12 gap-2 group shadow-lg shadow-primary/20"
            >
                <ShoppingBag className="size-5 group-hover:animate-bounce" />
                {addToCartLabel}
            </Button>
        </div>
    );
}
