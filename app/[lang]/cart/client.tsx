"use client";

/**
 * Cart Page Client Component
 * Sepet sayfası client wrapper - Redux ve session entegrasyonu
 */

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CartList } from "@/components/cart/cart-list";
import { CartSummary } from "@/components/cart/cart-summary";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectCartItems } from "@/lib/store/slices/cart.slice";
import { CartService } from "@/lib/api/cart.service";

interface CartClientProps {
    lang: string;
}

export function CartClient({ lang }: CartClientProps) {
    const t = useTranslations("cart");
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);

    const [isSyncing, setIsSyncing] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);

    // Session yüklenirken loading göster
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="size-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // API'ye sepet senkronizasyonu (opsiyonel - FakeAPI gerçek persist etmez)
    const syncCartToAPI = async () => {
        if (!session?.user?.id) return;

        setIsSyncing(true);
        setSyncError(null);

        try {
            // User ID'yi decode et (base64)
            const userId = parseInt(atob(session.user.id)) || 1;

            // Cart products formatına dönüştür
            const products = items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
            }));

            // Yeni sepet oluştur veya güncelle
            await CartService.create({
                userId,
                date: new Date().toISOString().split("T")[0],
                products,
            });
        } catch (error) {
            console.error("Cart sync error:", error);
            setSyncError(t("syncError"));
        } finally {
            setIsSyncing(false);
        }
    };

    const handleCheckout = () => {
        // Checkout sayfasına yönlendir
        router.push(`/${lang}/checkout`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{t("title")}</h1>

            {syncError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {syncError}
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
                        isLoading={isSyncing}
                    />
                </div>
            </div>

            {/* Debug: Session bilgisi (development) */}
            {process.env.NODE_ENV === "development" && session && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs">
                    <p className="font-mono">User ID: {session.user?.id}</p>
                    <p className="font-mono">Email: {session.user?.email}</p>
                </div>
            )}
        </div>
    );
}
