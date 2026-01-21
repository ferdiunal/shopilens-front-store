/**
 * User Service - FakeStoreAPI Entegrasyonu
 * Server-side kullanıcı işlemleri
 * 
 * @see https://fakestoreapi.com/docs
 */

import type {
    User,
    CreateUserInput,
    UpdateUserInput
} from "@/types";

const API_BASE = "https://fakestoreapi.com";

/**
 * UserService
 * Kullanıcı API servisi
 */
export class UserService {
    // ============================================
    // READ OPERATIONS (GET)
    // ============================================

    /**
     * Tüm kullanıcıları getirir
     * SSR: Her istekte güncel
     */
    static async getAll(limit?: number, sort?: "asc" | "desc"): Promise<User[]> {
        let url = `${API_BASE}/users`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", String(limit));
        if (sort) params.append("sort", sort);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const response = await fetch(url, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Tek kullanıcı detayı
     */
    static async getById(id: number): Promise<User | null> {
        try {
            const response = await fetch(`${API_BASE}/users/${id}`, {
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

    // ============================================
    // WRITE OPERATIONS (POST, PUT, DELETE)
    // ============================================

    /**
     * Yeni kullanıcı oluştur
     */
    static async create(user: CreateUserInput): Promise<User> {
        const response = await fetch(`${API_BASE}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to create user: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Kullanıcı güncelle
     */
    static async update(id: number, user: UpdateUserInput): Promise<User> {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to update user: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Kullanıcıyı kısmen güncelle (PATCH)
     */
    static async patch(id: number, user: UpdateUserInput): Promise<User> {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to patch user: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Kullanıcı sil
     */
    static async delete(id: number): Promise<User> {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: "DELETE",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.status}`);
        }

        return response.json();
    }
}
