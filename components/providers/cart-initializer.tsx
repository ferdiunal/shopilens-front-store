"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCart } from "@/lib/store/slices/cart.slice";
import { useCart } from "@/lib/hooks/use-cart";

/**
 * CartInitializer Component (Ana Proje)
 * useCart hook'undan gelen verileri Redux state'ine senkronize eder.
 */
export function CartInitializer() {
    const dispatch = useAppDispatch();
    const { items } = useCart();

    useEffect(() => {
        dispatch(setCart(items));
    }, [dispatch, items]);

    return null;
}
