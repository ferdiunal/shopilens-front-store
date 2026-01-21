/**
 * Redux Toolkit Store Konfigürasyonu
 * Client-side state management
 */

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart.slice";
import productsReducer from "./slices/products.slice";

/**
 * Store factory fonksiyonu
 * Next.js App Router ile uyumlu
 */
export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            products: productsReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
};

// Store tipleri
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
