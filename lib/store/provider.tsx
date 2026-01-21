/**
 * Redux Store Provider
 * Client Component - App'i store ile sarmalar
 * ProductsInitializer ile ürünleri önyükler
 */

"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { ProductsInitializer } from "@/components/providers/products-initializer";

interface StoreProviderProps {
    children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        // İlk render'da store oluştur
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            <ProductsInitializer />
            {children}
        </Provider>
    );
}

