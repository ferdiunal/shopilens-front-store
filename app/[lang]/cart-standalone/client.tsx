"use client";

/**
 * Cart Page Client Component - Standalone
 * Redux ve Cookie API entegrasyonu
 */

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CartList } from "@/components/cart/cart-list";
import { CartSummary } from "@/components/cart/cart-summary";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/hooks/use-cart";

interface CartClientProps {
    lang: string;
}

export function CartClient({ lang }: CartClientProps) {
    const t = useTranslations("cart");
    const router = useRouter();
    const { items, isLoading, error } = useCart();

    if (isLoading && items.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    const handleCheckout = () => {
        router.push(`/${lang}/checkout`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

            {error && (
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sepet Listesi */}
                <div className="lg:col-span-2">
                    <CartList lang={lang} />
                </div>

                {/* Sipariş Özeti */}
                <div className="lg:col-span-1">
                    <CartSummary
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    );
}
