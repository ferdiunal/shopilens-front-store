/**
 * Redux Store Provider
 * Client Component - App'i store ile sarmalar
 */

"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";

interface StoreProviderProps {
    children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        // İlk render'da store oluştur
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
