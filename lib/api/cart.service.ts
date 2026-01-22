/**
 * Cart Service - FakeStoreAPI Entegrasyonu
 * Server-side sepet işlemleri
 * 
 * @see https://fakestoreapi.com/docs
 */

import type {
    Cart,
    CreateCartInput,
    UpdateCartInput,
    CartFilterParams
} from "@/types";

import getAllCarts from "./carts.json";



export class CartService {
    // ============================================
    // READ OPERATIONS (GET)
    // ============================================

    static async getAll(filters?: CartFilterParams): Promise<Cart[]> {
        let filtered = [...getAllCarts];

        // Tarih filtresi
        if (filters?.startdate) {
            filtered = filtered.filter(c => new Date(c.date) >= new Date(filters.startdate!));
        }
        if (filters?.enddate) {
            filtered = filtered.filter(c => new Date(c.date) <= new Date(filters.enddate!));
        }

        // Sıralama
        if (filters?.sort) {
            filtered.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return filters.sort === "asc" ? dateA - dateB : dateB - dateA;
            });
        }

        // Limit
        if (filters?.limit) {
            filtered = filtered.slice(0, filters.limit);
        }

        return filtered as Cart[];
    }

    static async getById(id: number): Promise<Cart | null> {
        const cart = getAllCarts.find(c => c.id === Number(id));
        return (cart as Cart) || null;
    }

    static async getByUserId(
        userId: number,
        filters?: CartFilterParams
    ): Promise<Cart[]> {
        let filtered = getAllCarts.filter(c => c.userId === Number(userId));

        // Tarih filtresi
        if (filters?.startdate) {
            filtered = filtered.filter(c => new Date(c.date) >= new Date(filters.startdate!));
        }
        if (filters?.enddate) {
            filtered = filtered.filter(c => new Date(c.date) <= new Date(filters.enddate!));
        }

        // Sıralama
        if (filters?.sort) {
            filtered.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return filters.sort === "asc" ? dateA - dateB : dateB - dateA;
            });
        }

        // Limit
        if (filters?.limit) {
            filtered = filtered.slice(0, filters.limit);
        }

        return filtered as Cart[];
    }

    /**
     * Tarih aralığına göre sepetler
     */
    static async getByDateRange(
        startDate: string,
        endDate: string
    ): Promise<Cart[]> {
        return this.getAll({ startdate: startDate, enddate: endDate });
    }

    // ============================================
    // WRITE OPERATIONS (POST, PUT, DELETE)
    // ============================================

    /**
     * Yeni sepet oluştur
     */
    static async create(cart: CreateCartInput): Promise<Cart> {
        // Mock success response
        return {
            ...cart,
            id: Math.floor(Math.random() * 1000) + 100
        } as unknown as Cart;
    }

    /**
     * Sepet güncelle
     */
    static async update(id: number, cart: UpdateCartInput): Promise<Cart> {
        // Mock success response
        return {
            id,
            userId: cart.userId || 1,
            date: cart.date || new Date().toISOString(),
            products: cart.products || []
        } as Cart;
    }

    /**
     * Sepeti kısmen güncelle (PATCH)
     */
    static async patch(id: number, cart: UpdateCartInput): Promise<Cart> {
        // Mock success response
        return {
            id,
            userId: cart.userId || 1,
            date: cart.date || new Date().toISOString(),
            products: cart.products || []
        } as Cart;
    }

    /**
     * Sepet sil
     */
    static async delete(id: number): Promise<Cart> {
        // Mock success response
        return {
            id,
            userId: 1,
            date: new Date().toISOString(),
            products: []
        } as Cart;
    }
}
