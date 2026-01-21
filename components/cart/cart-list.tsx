"use client";

/**
 * Cart List Component
 * Sepetteki ürünlerin listesi
 */

import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CartItem } from "./cart-item";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
    selectCartItems,
    updateQuantity,
    removeItem,
} from "@/lib/store/slices/cart.slice";

interface CartListProps {
    lang: string;
}

export function CartList({ lang }: CartListProps) {
    const t = useTranslations("cart");
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleRemove = (productId: number) => {
        dispatch(removeItem(productId));
    };

    // Boş sepet
    if (items.length === 0) {
        return (
            <div className="bg-white border rounded-lg p-8">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <ShoppingBag className="size-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {t("empty")}
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-sm">
                        {t("emptyDescription")}
                    </p>
                    <Link
                        href={`/${lang}/products`}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {t("continueShopping")}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                    {t("title")} ({items.length})
                </h2>
            </div>

            <div className="divide-y">
                {items.map((item) => (
                    <CartItem
                        key={item.product.id}
                        item={item}
                        lang={lang}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemove}
                    />
                ))}
            </div>

            <div className="mt-6 pt-6 border-t">
                <Link
                    href={`/${lang}/products`}
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                    ← {t("continueShopping")}
                </Link>
            </div>
        </div>
    );
}
