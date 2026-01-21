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

const API_BASE = "https://fakestoreapi.com";

/**
 * CartService
 * Sepet API servisi - SSR/SSG destekli
 */
export class CartService {
    // ============================================
    // READ OPERATIONS (GET)
    // ============================================

    /**
     * Tüm sepetleri getirir
     * SSR: Her istekte güncel veri
     */
    static async getAll(filters?: CartFilterParams): Promise<Cart[]> {
        let url = `${API_BASE}/carts`;
        const params = new URLSearchParams();

        if (filters?.startdate) params.append("startdate", filters.startdate);
        if (filters?.enddate) params.append("enddate", filters.enddate);
        if (filters?.sort) params.append("sort", filters.sort);
        if (filters?.limit) params.append("limit", String(filters.limit));

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const response = await fetch(url, {
            cache: "no-store", // SSR: Her istekte güncel
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch carts: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Tek sepet detayı
     */
    static async getById(id: number): Promise<Cart | null> {
        try {
            const response = await fetch(`${API_BASE}/carts/${id}`, {
                cache: "no-store",
            });

            if (!response.ok) {
                return null;
            }

            return response.json();
        } catch {
            return null;
        }
    }

    /**
     * Kullanıcının sepetlerini getir
     * SSR: Authenticated request için
     */
    static async getByUserId(
        userId: number,
        filters?: CartFilterParams
    ): Promise<Cart[]> {
        let url = `${API_BASE}/carts/user/${userId}`;
        const params = new URLSearchParams();

        if (filters?.startdate) params.append("startdate", filters.startdate);
        if (filters?.enddate) params.append("enddate", filters.enddate);
        if (filters?.sort) params.append("sort", filters.sort);
        if (filters?.limit) params.append("limit", String(filters.limit));

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const response = await fetch(url, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user carts: ${response.status}`);
        }

        return response.json();
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
        const response = await fetch(`${API_BASE}/carts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to create cart: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Sepet güncelle
     */
    static async update(id: number, cart: UpdateCartInput): Promise<Cart> {
        const response = await fetch(`${API_BASE}/carts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to update cart: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Sepeti kısmen güncelle (PATCH)
     */
    static async patch(id: number, cart: UpdateCartInput): Promise<Cart> {
        const response = await fetch(`${API_BASE}/carts/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to patch cart: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Sepet sil
     */
    static async delete(id: number): Promise<Cart> {
        const response = await fetch(`${API_BASE}/carts/${id}`, {
            method: "DELETE",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete cart: ${response.status}`);
        }

        return response.json();
    }
}
