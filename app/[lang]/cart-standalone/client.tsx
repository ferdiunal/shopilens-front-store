"use client";

/**
 * Cart Page Client Component
 * Sepet sayfası client wrapper - Redux ve session entegrasyonu
 * FakeStoreAPI'den sepet verisi çeker ve userId'ye göre filtreler
 */

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { CartList } from "@/components/cart/cart-list";
import { CartSummary } from "@/components/cart/cart-summary";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectCartItems, setCart } from "@/lib/store/slices/cart.slice";
import { selectProducts } from "@/lib/store/slices/products.slice";
import type { Product, CartItem } from "@/types";

const API_BASE = "https://fakestoreapi.com";

// FakeStoreAPI Cart Response tipi (Gerçek API formatı)
interface FakeStoreCart {
    id: number;
    userId: number;
    date: string;
    products: Array<{
        productId: number;
        quantity: number;
    }>;
}

interface CartClientProps {
    lang: string;
}

export function CartClient({ lang }: CartClientProps) {
    const t = useTranslations("cart");
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const allProducts = useAppSelector(selectProducts);

    const [isLoading, setIsLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);

    // User ID'yi localStorage'dan al veya oluştur
    const getUserId = useCallback((): number => {
        if (session?.user?.id) {
            const storedId = localStorage.getItem("userId." + session.user.id);
            if (storedId) {
                return parseInt(storedId);
            }
            const id = Math.floor(Math.random() * 7) + 1; // 1-7 arası
            localStorage.setItem("userId." + session.user.id, id.toString());
            return id;
        }
        return 1; // Demo için default user
    }, [session?.user?.id]);

    // FakeStoreAPI'den sepet verilerini çek
    const fetchCartFromAPI = useCallback(async () => {
        if (allProducts.length === 0) return; // Ürünler yüklenmeden sepeti eşleyemeyiz

        setIsLoading(true);
        setSyncError(null);

        try {
            // Tüm sepetleri çek
            const response = await fetch(`${API_BASE}/carts`);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const allCarts: FakeStoreCart[] = await response.json();
            const userId = getUserId();

            // userId'ye göre filtrele
            const userCart = allCarts.find((cart) => cart.userId === userId);

            if (userCart && userCart.products.length > 0) {
                // API'den gelen ürünleri CartItem formatına dönüştür
                const cartItems: CartItem[] = userCart.products
                    .map((item) => {
                        const product = allProducts.find((p) => p.id === item.productId);
                        if (!product) return null;
                        return {
                            product,
                            quantity: item.quantity,
                        };
                    })
                    .filter((item): item is CartItem => item !== null);

                // Redux state'i güncelle
                dispatch(setCart(cartItems));
                console.log(`Loaded cart for userId ${userId}:`, cartItems.length, "items");
            } else {
                console.log(`No cart found for userId ${userId}`);
            }
        } catch (error) {
            console.error("Cart fetch error:", error);
            setSyncError(t("syncError"));
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, getUserId, t, allProducts]);

    // Component mount olduğunda veya ürünler yüklendiğinde API'den sepeti çek
    useEffect(() => {
        if (status === "authenticated" && allProducts.length > 0) {
            fetchCartFromAPI();
        } else if (status === "unauthenticated") {
            setIsLoading(false);
        }
    }, [status, fetchCartFromAPI, allProducts.length]);

    // Session yüklenirken veya sepet çekilirken loading göster
    if (status === "loading" || isLoading) {
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

            {syncError && (
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
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
                <div className="mt-8 p-4 bg-muted rounded-lg text-xs">
                    <p className="font-mono text-muted-foreground">User ID: {getUserId()}</p>
                    <p className="font-mono text-muted-foreground">Session ID: {session.user?.id}</p>
                    <p className="font-mono text-muted-foreground">Cart Items: {items.length}</p>
                </div>
            )}
        </div>
    );
}
