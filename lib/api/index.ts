/**
 * API Services Index
 * Tüm API servislerini tek noktadan export eder
 */

export { ProductService } from "./product.service";
export { CartService } from "./cart.service";
export { UserService } from "./user.service";

/**
 * API Base URL
 */
export const API_BASE_URL = "https://fakestoreapi.com";

/**
 * Cache stratejileri
 */
export const CacheStrategy = {
    /** Statik veriler - nadiren değişir (24 saat) */
    STATIC: { next: { revalidate: 86400 } },
    /** Ürünler - orta sıklıkta değişir (1 saat) */
    PRODUCTS: { next: { revalidate: 3600 } },
    /** Detay sayfaları - daha sık güncellenir (30 dakika) */
    DETAIL: { next: { revalidate: 1800 } },
    /** Dinamik veriler - her istekte güncel */
    DYNAMIC: { cache: "no-store" as const },
} as const;
