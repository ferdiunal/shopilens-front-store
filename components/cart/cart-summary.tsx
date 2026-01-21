"use client";

/**
 * Cart Summary Component
 * Sipariş özeti paneli
 */

import { useTranslations } from "next-intl";
import { Trash2, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import {
    selectCartItems,
    selectCartTotal,
    clearCart,
} from "@/lib/store/slices/cart.slice";

interface CartSummaryProps {
    onCheckout?: () => void;
    isLoading?: boolean;
}

export function CartSummary({ onCheckout, isLoading = false }: CartSummaryProps) {
    const t = useTranslations("cart");
    const tCommon = useTranslations("common");
    const dispatch = useAppDispatch();

    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        if (onCheckout) {
            onCheckout();
        }
    };

    const isCartEmpty = items.length === 0;

    return (
        <div className="bg-gray-50 border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">{t("orderSummary")}</h2>

            <div className="space-y-3 mb-6">
                {/* Ürün sayısı */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{t("items")}</span>
                    <span>{itemCount}</span>
                </div>

                {/* Ara toplam */}
                <div className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>{tCommon("currency")}{total.toFixed(2)}</span>
                </div>

                {/* Kargo - Örnek */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{t("shipping")}</span>
                    <span className="text-green-600">{t("freeShipping")}</span>
                </div>

                {/* Toplam */}
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>{t("total")}</span>
                    <span>{tCommon("currency")}{total.toFixed(2)}</span>
                </div>
            </div>

            {/* Ödemeye geç butonu */}
            <Button
                onClick={handleCheckout}
                disabled={isCartEmpty || isLoading}
                className="w-full h-12 text-base font-semibold"
            >
                {isLoading ? (
                    <Loader2 className="size-5 animate-spin mr-2" />
                ) : (
                    <CreditCard className="size-5 mr-2" />
                )}
                {t("checkout")}
            </Button>

            {/* Sepeti temizle butonu */}
            <Button
                variant="outline"
                onClick={handleClearCart}
                disabled={isCartEmpty}
                className="w-full mt-3"
            >
                <Trash2 className="size-4 mr-2" />
                {t("clearCart")}
            </Button>

            {/* Güvenlik bilgisi */}
            <p className="text-xs text-gray-500 text-center mt-4">
                {t("secureCheckout")}
            </p>
        </div>
    );
}
