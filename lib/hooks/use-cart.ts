"use client";

/**
 * useCart Hook
 * Sepet işlemleri - Redux state + FakeStoreAPI entegrasyonu
 */

import { useCallback, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    clearCart,
    setCart,
    selectCartItems,
    selectCartTotal,
    selectCartItemCount,
} from "@/lib/store/slices/cart.slice";
import type { Product } from "@/types";
import { CartService } from "@/lib/api/cart.service";

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

    // Cookie API Yolu - Home uygulamasında rewrites üzerinden gider
    const API_PATH = "/cart/api/cart";

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_PATH);
            const result = await response.json();
            if (result.success) {
                // Redux state'i API'den gelen verilerle senkronize et
                dispatch(setCart(result.data));
            }
        } catch (err) {
            console.error("Cart fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    /**
     * Sepete ürün ekle
     */
    const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(API_PATH, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product, quantity }),
            });

            const result = await response.json();
            if (result.success) {
                dispatch(setCart(result.data));
                return true;
            }
            return false;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Sepete eklenirken hata oluştu");
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    /**
     * Sepetten ürün çıkar
     */
    const removeFromCart = useCallback(async (productId: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_PATH}?productId=${productId}`, {
                method: "DELETE",
            });

            const result = await response.json();
            if (result.success) {
                dispatch(setCart(result.data));
                return true;
            }
            return false;
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
            const response = await fetch(API_PATH, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });

            const result = await response.json();
            if (result.success) {
                dispatch(setCart(result.data));
                return true;
            }
            return false;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Miktar güncellenirken hata oluştu");
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    /**
     * Sepeti temizle
     */
    const emptyCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(API_PATH, {
                method: "DELETE",
            });

            const result = await response.json();
            if (result.success) {
                dispatch(clearCart());
                return true;
            }
            return false;
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
        refresh: fetchCart
    };
}
