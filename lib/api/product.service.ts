/**
 * Product Service - FakeStoreAPI Entegrasyonu
 * Server-side veri çekme işlemleri (SSR/SSG/ISR için)
 * 
 * @see https://fakestoreapi.com/docs
 */

import type {
    Product,
    Category,
    ProductFilterParams,
    CreateProductInput,
    UpdateProductInput
} from "@/types";

const API_BASE = "https://fakestoreapi.com";

/**
 * Cache stratejileri
 */
const CACHE = {
    /** Kategoriler uzun süre değişmez */
    STATIC: 86400,    // 24 saat
    /** Ürünler orta sıklıkta değişir */
    PRODUCTS: 3600,   // 1 saat
    /** Ürün detayı daha sık güncellenebilir */
    DETAIL: 1800,     // 30 dakika
    /** Dinamik veriler */
    DYNAMIC: 0,       // Cache yok
} as const;

/**
 * ProductService
 * SSR/SSG/ISR destekli ürün API servisi
 */
export class ProductService {
    // ============================================
    // READ OPERATIONS (GET)
    // ============================================

    /**
     * Tüm ürünleri getirir
     * SSG/ISR: Build time + revalidation
     * 
     * @param limit - Opsiyonel limit parametresi
     * @param sort - Sıralama (asc/desc)
     */
    static async getAll(limit?: number, sort?: "asc" | "desc"): Promise<Product[]> {
        let url = `${API_BASE}/products`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", String(limit));
        if (sort) params.append("sort", sort);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const response = await fetch(url, {
            next: {
                revalidate: CACHE.PRODUCTS,
                tags: ["products"]
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Tek ürün detayı
     * SSG + ISR: generateStaticParams ile pre-render
     */
    static async getById(id: number): Promise<Product | null> {
        try {
            const response = await fetch(`${API_BASE}/products/${id}`, {
                next: {
                    revalidate: CACHE.DETAIL,
                    tags: ["products", `product-${id}`]
                },
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
     * Kategoriye göre ürünler
     * SSG/ISR destekli
     */
    static async getByCategory(
        category: Category,
        limit?: number,
        sort?: "asc" | "desc"
    ): Promise<Product[]> {
        let url = `${API_BASE}/products/category/${encodeURIComponent(category)}`;
        const params = new URLSearchParams();

        if (limit) params.append("limit", String(limit));
        if (sort) params.append("sort", sort);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const response = await fetch(url, {
            next: {
                revalidate: CACHE.PRODUCTS,
                tags: ["products", `category-${category}`]
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products for category: ${category}`);
        }

        return response.json();
    }

    /**
     * Tüm kategorileri getirir
     * SSG: Statik olarak cache'lenir
     */
    static async getCategories(): Promise<Category[]> {
        const response = await fetch(`${API_BASE}/products/categories`, {
            next: {
                revalidate: CACHE.STATIC,
                tags: ["categories"]
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        return response.json();
    }

    // ============================================
    // WRITE OPERATIONS (POST, PUT, DELETE)
    // ============================================

    /**
     * Yeni ürün oluştur
     * SSR: Server Action içinde kullanılabilir
     */
    static async create(product: CreateProductInput): Promise<Product> {
        const response = await fetch(`${API_BASE}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to create product: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Ürün güncelle
     */
    static async update(id: number, product: UpdateProductInput): Promise<Product> {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to update product: ${response.status}`);
        }

        return response.json();
    }

    /**
     * Ürün sil
     */
    static async delete(id: number): Promise<Product> {
        const response = await fetch(`${API_BASE}/products/${id}`, {
            method: "DELETE",
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.status}`);
        }

        return response.json();
    }

    // ============================================
    // HELPER METHODS
    // ============================================

    /**
     * Öne çıkan ürünler (ilk N ürün)
     */
    static async getFeatured(limit: number = 4): Promise<Product[]> {
        return this.getAll(limit);
    }

    /**
     * Ürünleri filtrele ve sırala (client-side)
     */
    static filterProducts(
        products: Product[],
        filters: ProductFilterParams
    ): Product[] {
        let filtered = [...products];

        // Kategori filtresi
        if (filters.category) {
            filtered = filtered.filter((p) => p.category === filters.category);
        }

        // Fiyat aralığı filtresi
        if (filters.minPrice !== undefined) {
            filtered = filtered.filter((p) => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== undefined) {
            filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
        }

        // Arama filtresi
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower)
            );
        }

        // Sıralama
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

        // Limit
        if (filters.limit) {
            filtered = filtered.slice(0, filters.limit);
        }

        return filtered;
    }

    /**
     * generateStaticParams için tüm ürün ID'leri
     * SSG: Build time'da ürün sayfaları oluşturmak için
     */
    static async getAllIds(): Promise<{ id: string }[]> {
        const products = await this.getAll();
        return products.map((product) => ({
            id: String(product.id),
        }));
    }

    /**
     * generateStaticParams için tüm kategori slug'ları
     */
    static async getAllCategorySlugs(): Promise<{ category: string }[]> {
        const categories = await this.getCategories();
        return categories.map((category) => ({
            category: encodeURIComponent(category),
        }));
    }
}
