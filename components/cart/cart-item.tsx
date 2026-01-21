"use client";

/**
 * Cart Item Component
 * Sepetteki tekil ürün kartı
 */

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./quantity-selector";
import type { CartItem as CartItemType } from "@/types";
import { useTranslations } from "next-intl";

interface CartItemProps {
    item: CartItemType;
    lang: string;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export function CartItem({
    item,
    lang,
    onUpdateQuantity,
    onRemove,
}: CartItemProps) {
    const t = useTranslations("cart");
    const { product, quantity } = item;

    return (
        <div className="flex gap-4 py-4 border-b last:border-b-0">
            {/* Ürün Resmi */}
            <Link
                href={`/${lang}/products/${product.id}`}
                className="flex-shrink-0"
            >
                <div className="relative size-24 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                    />
                </div>
            </Link>

            {/* Ürün Bilgileri */}
            <div className="flex-1 min-w-0">
                <Link
                    href={`/${lang}/products/${product.id}`}
                    className="hover:text-blue-600 transition-colors"
                >
                    <h3 className="font-medium text-sm line-clamp-2">
                        {product.title}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 mt-1 capitalize">
                    {product.category}
                </p>

                <div className="flex items-center justify-between mt-3">
                    {/* Miktar Kontrolü */}
                    <QuantitySelector
                        quantity={quantity}
                        onIncrease={() =>
                            onUpdateQuantity(product.id, quantity + 1)
                        }
                        onDecrease={() =>
                            onUpdateQuantity(product.id, quantity - 1)
                        }
                    />

                    {/* Fiyat */}
                    <div className="text-right">
                        <p className="font-semibold">
                            ${(product.price * quantity).toFixed(2)}
                        </p>
                        {quantity > 1 && (
                            <p className="text-xs text-gray-500">
                                ${product.price.toFixed(2)} x {quantity}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Silme Butonu */}
            <div className="flex-shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onRemove(product.id)}
                    aria-label={t("remove")}
                >
                    <Trash2 className="size-4" />
                </Button>
            </div>
        </div>
    );
}
