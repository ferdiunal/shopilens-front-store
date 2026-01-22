/**
 * Products Slice - Ürün State Yönetimi
 * FakeStoreAPI'den ürünleri çeker ve Redux state'te saklar
 */

import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

const API_BASE = "https://fakestoreapi.com";

// State tipi
interface ProductsState {
    items: Product[];
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null; // Cache için timestamp
}

const initialState: ProductsState = {
    items: [],
    isLoading: false,
    error: null,
    lastFetched: null,
};

// Async thunk - Tüm ürünleri çek
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            // Local API'den çek
            // const response = await fetch(`${API_BASE}/products`);
            // Production build sırasında tam URL gerekebilir, ancak client-side fetch için relative path yeterli olmalı.
            // Eğer SSR/SSG sırasında çalışıyorsa, absolute URL gerekebilir.
            const response = await fetch("/api/products");

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data: Product[] = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Ürünler yüklenirken hata oluştu"
            );
        }
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        /**
         * Ürünleri manuel olarak set et
         */
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
            state.lastFetched = Date.now();
        },

        /**
         * Tek bir ürünü güncelle
         */
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },

        /**
         * Error'u temizle
         */
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.lastFetched = Date.now();
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Actions
export const { setProducts, updateProduct, clearError } = productsSlice.actions;

// Selectors
export const selectProducts = (state: { products: ProductsState }) => state.products.items;

export const selectProductsLoading = (state: { products: ProductsState }) => state.products.isLoading;

export const selectProductsError = (state: { products: ProductsState }) => state.products.error;

export const selectProductById = (id: number) => (state: { products: ProductsState }) =>
    state.products.items.find((p) => p.id === id);

export const selectProductsByCategory = (category: string) => (state: { products: ProductsState }) =>
    state.products.items.filter((p) => p.category === category);

export const selectCategories = (state: { products: ProductsState }) =>
    [...new Set(state.products.items.map((p) => p.category))];

export const selectIsProductsCached = (state: { products: ProductsState }) => {
    // 5 dakika cache süresi
    const CACHE_DURATION = 5 * 60 * 1000;
    const { lastFetched } = state.products;
    return lastFetched !== null && Date.now() - lastFetched < CACHE_DURATION;
};

export default productsSlice.reducer;
