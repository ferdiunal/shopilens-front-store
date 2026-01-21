"use client";

/**
 * useProducts Hook
 * Redux products state'i ile çalışan hook
 * Otomatik veri çekme ve cache kontrolü
 */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    fetchProducts,
    selectProducts,
    selectProductsLoading,
    selectProductsError,
    selectProductById,
    selectProductsByCategory,
    selectCategories,
    selectIsProductsCached,
} from "@/lib/store/slices/products.slice";

/**
 * useProducts Hook
 * Ürünleri Redux'tan alır, gerekirse API'den çeker
 */
export function useProducts() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const isLoading = useAppSelector(selectProductsLoading);
    const error = useAppSelector(selectProductsError);
    const isCached = useAppSelector(selectIsProductsCached);

    // Component mount olduğunda, cache yoksa ürünleri çek
    useEffect(() => {
        if (!isCached && products.length === 0 && !isLoading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, isCached, products.length, isLoading]);

    // Manuel refresh
    const refetch = () => {
        dispatch(fetchProducts());
    };

    return {
        products,
        isLoading,
        error,
        isEmpty: products.length === 0,
        refetch,
    };
}

/**
 * useProduct Hook
 * Tek bir ürünü ID'ye göre alır
 */
export function useProduct(id: number) {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectProductById(id));
    const isLoading = useAppSelector(selectProductsLoading);
    const error = useAppSelector(selectProductsError);
    const products = useAppSelector(selectProducts);
    const isCached = useAppSelector(selectIsProductsCached);

    // Ürün yoksa ve cache yoksa, tüm ürünleri çek
    useEffect(() => {
        if (!product && !isCached && products.length === 0 && !isLoading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, product, isCached, products.length, isLoading]);

    return {
        product,
        isLoading,
        error,
    };
}

/**
 * useProductsByCategory Hook
 * Kategoriye göre ürünleri alır
 */
export function useProductsByCategory(category: string) {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProductsByCategory(category));
    const allProducts = useAppSelector(selectProducts);
    const isLoading = useAppSelector(selectProductsLoading);
    const error = useAppSelector(selectProductsError);
    const isCached = useAppSelector(selectIsProductsCached);

    // Ürünler yoksa ve cache yoksa, tüm ürünleri çek
    useEffect(() => {
        if (!isCached && allProducts.length === 0 && !isLoading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, isCached, allProducts.length, isLoading]);

    return {
        products,
        isLoading,
        error,
        isEmpty: products.length === 0,
    };
}

/**
 * useCategories Hook
 * Benzersiz kategorileri alır
 */
export function useCategories() {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const products = useAppSelector(selectProducts);
    const isLoading = useAppSelector(selectProductsLoading);
    const isCached = useAppSelector(selectIsProductsCached);

    useEffect(() => {
        if (!isCached && products.length === 0 && !isLoading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, isCached, products.length, isLoading]);

    return {
        categories,
        isLoading,
    };
}
