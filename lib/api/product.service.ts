/**
 * Product Service - Local Mock Data Integration
 * Server-side veri çekme işlemleri (SSR/SSG/ISR için)
 * FakestoreAPI yerine local json dosyalarını kullanır.
 */

import type {
    Product,
    Category,
    ProductFilterParams,
    CreateProductInput,
    UpdateProductInput
} from "@/types";
import path from "path";
import getAllProducts from "./products.json"
import { promises as fs } from "fs";

/**
 * Cache stratejileri - Mock veride de tutarlılık için kullanılabilir
 */
const CACHE = {
    STATIC: 86400,
    PRODUCTS: 3600,
    DETAIL: 1800,
    DYNAMIC: 0,
} as const;

export class ProductService {
    // ===========================================
    // READ OPERATIONS (GET)
    // ============================================

    static async getAll(limit?: number, sort?: "asc" | "desc"): Promise<Product[]> {

        if (sort) {
            getAllProducts.sort((a, b) => { // Bu sort işlemi mutate eder ama her seferinde yeni okuyoruz
                if (sort === "asc") return a.id - b.id; // Basit id sort, detaylı sort filterProducts'da var
                return b.id - a.id;
            });
        }

        if (limit) {
            getAllProducts.slice(0, limit);
        }

        return getAllProducts;
    }

    static async getById(id: number): Promise<Product | null> {
        return getAllProducts.find((p) => p.id === Number(id)) || null;
    }

    static async getByCategory(
        category: Category,
        limit?: number,
        sort?: "asc" | "desc"
    ): Promise<Product[]> {
        let filtered = getAllProducts.filter((p) => p.category === category); // decodeURI gerekebilir ama şimdilik doğrudan eşleşme

        // Kategori adları bazen encoded gelebilir, kontrol edelim
        if (filtered.length === 0) {
            const decodedCategory = decodeURIComponent(category);
            filtered = getAllProducts.filter((p) => p.category === decodedCategory);
        }

        if (limit) {
            filtered = filtered.slice(0, limit);
        }

        return filtered;
    }

    static async getCategories(): Promise<Category[]> {
        const categories = Array.from(new Set(getAllProducts.map((p) => p.category))) as Category[];
        return categories;
    }

    // ============================================
    // WRITE OPERATIONS (MOCK - NO PERSISTENCE)
    // ============================================

    static async create(product: CreateProductInput): Promise<Product> {
        // Mock success response
        return {
            id: Math.floor(Math.random() * 1000) + 21,
            ...product,
            rating: { rate: 0, count: 0 }
        };
    }

    static async update(id: number, product: UpdateProductInput): Promise<Product> {
        // Mock success response
        return {
            id,
            title: product.title || "Updated Product",
            price: product.price || 0,
            description: product.description || "Updated",
            image: product.image || "",
            category: product.category || "general",
            rating: { rate: 0, count: 0 }
        } as Product;
    }

    static async delete(id: number): Promise<Product> {
        // Mock success response
        return {
            id,
            title: "Deleted Product",
            price: 0,
            description: "Deleted",
            category: "deleted",
            image: "",
            rating: { rate: 0, count: 0 }
        };
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    static async getFeatured(limit: number = 4): Promise<Product[]> {
        return this.getAll(limit);
    }

    static filterProducts(
        products: Product[],
        filters: ProductFilterParams
    ): Product[] {
        let filtered = [...products];

        if (filters.category) {
            filtered = filtered.filter((p) => p.category === filters.category);
        }

        if (filters.minPrice !== undefined) {
            filtered = filtered.filter((p) => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== undefined) {
            filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower)
            );
        }

        if (filters.sortBy) {
            filtered.sort((a, b) => {
                let comparison = 0;
                switch (filters.sortBy) {
                    case "price":
                        comparison = a.price - b.price;
                        break;
                    case "title":
                        comparison = a.title.localeCompare(b.title);
                        break;
                    case "rating":
                        comparison = a.rating.rate - b.rating.rate;
                        break;
                }
                return filters.sortOrder === "desc" ? -comparison : comparison;
            });
        }

        // Limit should be applied AFTER filtering, if intended for pagination-like behavior
        // But original logic had it here too.
        if (filters.limit) {
            filtered = filtered.slice(0, filters.limit);
        }

        return filtered;
    }

    static async getAllIds(): Promise<{ id: string }[]> {
        try {
            const products = await this.getAll();
            return products.map((product) => ({
                id: String(product.id),
            }));
        } catch (error) {
            console.warn("getAllIds error:", error);
            return [];
        }
    }

    static async getAllCategorySlugs(): Promise<{ category: string }[]> {
        try {
            const categories = await this.getCategories();
            return categories.map((category) => ({
                category: encodeURIComponent(category),
            }));
        } catch (error) {
            console.warn("getAllCategorySlugs error:", error);
            return [];
        }
    }
}
