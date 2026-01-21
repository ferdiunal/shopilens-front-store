"use client";

/**
 * ProductDetailClient Component
 * Interaktif öğeler: Color, Size, Actions
 * FakeStoreAPI entegrasyonu ile sepete ekleme
 */

import { useState } from "react";
import {
    ColorSelector,
    SizeSelector,
    ProductActions,
    type ColorOption,
    type SizeOption,
} from "@/components/product/detail";
import { useCart } from "@/lib/hooks/use-cart";
import type { Product } from "@/types";

interface ProductDetailClientProps {
    product: Product;
    addToCartLabel: string;
}

// Demo renk seçenekleri
const defaultColors: ColorOption[] = [
    { id: "white", name: "Cloud White", hex: "#f8f9fa" },
    { id: "black", name: "Midnight Black", hex: "#111827" },
    { id: "navy", name: "Navy Blue", hex: "#1e3a8a" },
];

// Demo beden seçenekleri
const defaultSizes: SizeOption[] = [
    { id: "xs", label: "XS", inStock: false },
    { id: "s", label: "S", inStock: true },
    { id: "m", label: "M", inStock: true },
    { id: "l", label: "L", inStock: true },
    { id: "xl", label: "XL", inStock: true },
    { id: "xxl", label: "XXL", inStock: true },
];

export function ProductDetailClient({
    product,
    addToCartLabel,
}: ProductDetailClientProps) {
    const [selectedColor, setSelectedColor] = useState(defaultColors[0].id);
    const [selectedSize, setSelectedSize] = useState<string | null>("m");
    const { addToCart, isLoading } = useCart();

    const handleAddToCart = async (product: Product, quantity: number) => {
        await addToCart(product, quantity);
    };

    const handleSizeGuideClick = () => {
        // TODO: Size guide modal açılacak
        console.log("Size guide clicked");
    };

    return (
        <div className="space-y-6">
            {/* Color Selector */}
            <ColorSelector
                colors={defaultColors}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
            />

            {/* Size Selector */}
            <SizeSelector
                sizes={defaultSizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                onSizeGuideClick={handleSizeGuideClick}
            />

            {/* Actions */}
            <ProductActions
                product={product}
                addToCartLabel={addToCartLabel}
                onAddToCart={handleAddToCart}
                isLoading={isLoading}
                className="pt-4"
            />
        </div>
    );
}
