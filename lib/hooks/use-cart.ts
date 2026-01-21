"use client";

/**
 * useCart Hook
 * Sepet işlemleri - Redux state + FakeStoreAPI entegrasyonu
 */

import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    selectCartItems,
    selectCartTotal,
    selectCartItemCount,
} from "@/lib/store/slices/cart.slice";
import { CartService } from "@/lib/api/cart.service";
import type { Product } from "@/types";

const API_BASE = "https://fakestoreapi.com";

/**
 * useCart Hook
 * Sepete ekleme, çıkarma, güncelleme işlemlerini yönetir
 * Her işlemde FakeStoreAPI'ye de istek gönderir
 */
export function useCart() {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);
    const itemCount = useAppSelector(selectCartItemCount);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // User ID'yi session'dan al (base64 decode veya default 1)
    const getUserId = useCallback((): number => {
        if (session?.user?.id) {
            const getSessionId = localStorage.getItem("userId." + session.user.id);
            if (getSessionId) {
                return parseInt(getSessionId);
            }
            const id = Math.floor(Math.random() * 7);
            localStorage.setItem("userId." + session.user.id, id.toString());
            return id;
        }
        return 1; // Demo için default user
    }, [session?.user?.id]);

    /**
     * FakeStoreAPI'ye sepet gönder
     * API Format: { userId, products: [{ id, title, price, description, category, image }] }
     */
    const syncToAPI = useCallback(async (products: Product[]) => {
        const userId = getUserId();

        // FakeStoreAPI formatına dönüştür
        const apiProducts = products.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
        }));

        try {
            const response = await fetch(`${API_BASE}/carts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: Math.floor(Math.random() * 7),
                    userId,
                    products: apiProducts,
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Cart synced to FakeStoreAPI:", data);
            return data;
        } catch (err) {
            console.error("Cart sync error:", err);
            throw err;
        }
    }, [getUserId]);

    /**
     * Sepete ürün ekle
     */
    const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Local Redux state'i güncelle
            dispatch(addItem({ product, quantity }));

            // 2. FakeStoreAPI'ye gönder (product objesini gönder)
            await syncToAPI([product]);

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Sepete eklenirken hata oluştu");
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, syncToAPI]);

    /**
     * Sepetten ürün çıkar
     */
    const removeFromCart = useCallback(async (productId: number) => {
        setIsLoading(true);
        setError(null);

        try {
            // Local Redux state'i güncelle
            dispatch(removeItem(productId));

            // Not: FakeStoreAPI fake olduğundan delete işlemi simüle edilir
            console.log("Product removed from cart:", productId);

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ürün çıkarılırken hata oluştu");
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    /**
     * Ürün miktarını güncelle
     */
    const updateItemQuantity = useCallback(async (productId: number, quantity: number) => {
        setIsLoading(true);
        setError(null);

        try {
            // Local Redux state'i güncelle
            dispatch(updateQuantity({ productId, quantity }));

            // FakeStoreAPI'ye güncelleme gönder
            // Not: updateItemQuantity için product bilgisi gerekli, mevcut cart items'tan alınabilir
            const cartItem = items.find((item) => item.product.id === productId);
            if (quantity > 0 && cartItem) {
                await syncToAPI([cartItem.product]);
            }

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Miktar güncellenirken hata oluştu");
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch, syncToAPI]);

    /**
     * Sepeti temizle
     */
    const emptyCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            dispatch(clearCart());
            console.log("Cart cleared");
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Sepet temizlenirken hata oluştu");
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    return {
        // State
        items,
        total,
        itemCount,
        isLoading,
        error,
        isEmpty: items.length === 0,

        // Actions
        addToCart,
        removeFromCart,
        updateItemQuantity,
        emptyCart,
    };
}
