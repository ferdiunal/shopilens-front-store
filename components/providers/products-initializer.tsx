"use client";

/**
 * ProductsInitializer Component
 * Layout'ta kullanılır, uygulama yüklendiğinde ürünleri Redux'a çeker
 */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    fetchProducts,
    selectIsProductsCached,
    selectProductsLoading,
} from "@/lib/store/slices/products.slice";

export function ProductsInitializer() {
    const dispatch = useAppDispatch();
    const isCached = useAppSelector(selectIsProductsCached);
    const isLoading = useAppSelector(selectProductsLoading);

    useEffect(() => {
        // Cache yoksa ve yüklenmiyor ise ürünleri çek
        if (!isCached && !isLoading) {
            dispatch(fetchProducts());
        }
    }, [dispatch, isCached, isLoading]);

    // Bu component sadece side-effect için, render etmiyor
    return null;
}
