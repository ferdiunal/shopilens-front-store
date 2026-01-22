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

import getAllUsers from "./users.json";

// ... previous imports ...

export class UserService {
    // ============================================
    // READ OPERATIONS (GET)
    // ============================================

    static async getAll(limit?: number, sort?: "asc" | "desc"): Promise<User[]> {
        const users = [...getAllUsers];

        if (sort) {
            users.sort((a, b) => {
                return sort === "asc" ? a.id - b.id : b.id - a.id;
            });
        }

        if (limit) {
            return users.slice(0, limit);
        }

        return users;
    }

    static async getById(id: number): Promise<User | null> {
        return getAllUsers.find(u => u.id === Number(id)) || null;
    }

    // ============================================
    // WRITE OPERATIONS (MOCK - NO PERSISTENCE)
    // ============================================

    static async create(user: CreateUserInput): Promise<User> {
        return {
            id: Math.floor(Math.random() * 1000) + 100,
            ...user
        } as User;
    }

    static async update(id: number, user: UpdateUserInput): Promise<User> {
        const existingUser = getAllUsers.find(u => u.id === Number(id));
        // Basic mock implementation
        return {
            ...existingUser,
            ...user,
            id // ensure id is preserved
        } as User;
    }

    static async patch(id: number, user: UpdateUserInput): Promise<User> {
        const existingUser = getAllUsers.find(u => u.id === Number(id));
        // Basic mock implementation
        return {
            ...existingUser,
            ...user,
            id // ensure id is preserved
        } as User;
    }

    static async delete(id: number): Promise<User> {
        const existingUser = getAllUsers.find(u => u.id === Number(id));
        return {
            ...(existingUser || {}),
            id // ensure id is preserved
        } as User;
    }
}
