/**
 * Cart Slice - Sepet State Yönetimi
 * Redux Toolkit ile oluşturulmuş
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, CartItem, CartState } from "@/types";

const initialState: CartState = {
    items: [],
    isOpen: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * Sepete ürün ekle
         * Eğer ürün zaten varsa quantity arttırır
         */
        addItem: (
            state,
            action: PayloadAction<{ product: Product; quantity: number }>
        ) => {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ product, quantity });
            }
        },

        /**
         * Sepetten ürün çıkar
         */
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
        },

        /**
         * Ürün miktarını güncelle
         */
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
            const item = state.items.find(
                (item) => item.product.id === action.payload.productId
            );
            if (item) {
                if (action.payload.quantity <= 0) {
                    // Miktar 0 veya daha azsa ürünü çıkar
                    state.items = state.items.filter(
                        (i) => i.product.id !== action.payload.productId
                    );
                } else {
                    item.quantity = action.payload.quantity;
                }
            }
        },

        /**
         * Sepeti temizle
         */
        clearCart: (state) => {
            state.items = [];
        },

        /**
         * Sepet sidebar'ı aç/kapat
         */
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },

        /**
         * Sepet sidebar'ı aç
         */
        openCart: (state) => {
            state.isOpen = true;
        },

        /**
         * Sepet sidebar'ı kapat
         */
        closeCart: (state) => {
            state.isOpen = false;
        },
    },
});

// Actions
export const {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

export const selectCartItemCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const selectIsCartOpen = (state: { cart: CartState }) =>
    state.cart.isOpen;

export const selectCartItemById = (productId: number) => (state: { cart: CartState }) =>
    state.cart.items.find((item) => item.product.id === productId);

export default cartSlice.reducer;
