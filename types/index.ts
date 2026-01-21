/**
 * E-Ticaret Platformu - TypeScript Tip Tanımları
 * FakeStoreAPI OpenAPI v2.1.11 spec'ine göre oluşturuldu
 */

// ============================================
// PRODUCT TİPLERİ
// ============================================

/**
 * Ürün Tipi - FakeStoreAPI Product Schema
 * @see https://fakestoreapi.com/docs
 */
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

/**
 * Ürün Rating Tipi
 */
export interface Rating {
    rate: number;
    count: number;
}

/**
 * Yeni Ürün Oluşturma Tipi (POST /products)
 */
export interface CreateProductInput {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

/**
 * Ürün Güncelleme Tipi (PUT /products/:id)
 */
export interface UpdateProductInput extends Partial<CreateProductInput> { }

/**
 * Kategori Tipi
 */
export type Category =
    | "electronics"
    | "jewelery"
    | "men's clothing"
    | "women's clothing";

// ============================================
// CART TİPLERİ
// ============================================

/**
 * Sepet Ürün Tipi (API'den gelen)
 */
export interface CartProduct {
    productId: number;
    quantity: number;
}

/**
 * Sepet Tipi - FakeStoreAPI Cart Schema
 */
export interface Cart {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
}

/**
 * Yeni Sepet Oluşturma Tipi (POST /carts)
 */
export interface CreateCartInput {
    userId: number;
    date: string;
    products: CartProduct[];
}

/**
 * Sepet Güncelleme Tipi (PUT /carts/:id)
 */
export interface UpdateCartInput extends Partial<CreateCartInput> { }

/**
 * Client-side Sepet Item Tipi (Redux Store için)
 */
export interface CartItem {
    product: Product;
    quantity: number;
}

/**
 * Client-side Sepet State Tipi
 */
export interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

// ============================================
// USER TİPLERİ
// ============================================

/**
 * Kullanıcı Adres Tipi
 */
export interface UserAddress {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
        lat: string;
        long: string;
    };
}

/**
 * Kullanıcı İsim Tipi
 */
export interface UserName {
    firstname: string;
    lastname: string;
}

/**
 * Kullanıcı Tipi - FakeStoreAPI User Schema
 */
export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    name: UserName;
    address: UserAddress;
    phone: string;
}

/**
 * Yeni Kullanıcı Oluşturma Tipi (POST /users)
 */
export interface CreateUserInput {
    email: string;
    username: string;
    password: string;
    name: UserName;
    address: UserAddress;
    phone: string;
}

/**
 * Kullanıcı Güncelleme Tipi (PUT /users/:id)
 */
export interface UpdateUserInput extends Partial<CreateUserInput> { }

// ============================================
// i18n TİPLERİ
// ============================================

/**
 * Desteklenen Diller
 */
export type Locale = "tr" | "en";

/**
 * Dictionary Yapısı - Tüm çeviriler
 * JSON dosyalarıyla uyumlu esnek yapı
 */
export interface Dictionary {
    common: {
        loading: string;
        error: string;
        search: string;
        price: string;
        currency: string;
        addToCart: string;
        viewDetails: string;
        shopNow: string;
        viewAll: string;
        newsletter: string;
        newsletterDescription: string;
        enterEmail: string;
        subscribe: string;
        allRightsReserved: string;
        [key: string]: string;
    };
    products: {
        title: string;
        description: string;
        featuredTitle: string;
        featuredDescription: string;
        noProducts: string;
        sortBy: string;
        featured: string;
        priceLowToHigh: string;
        priceHighToLow: string;
        showingProducts: string;
        [key: string]: string;
    };
    cart: {
        title: string;
        empty: string;
        subtotal: string;
        total: string;
        checkout: string;
        continueShopping: string;
        clearCart: string;
        itemAdded: string;
        itemRemoved: string;
        quantity: string;
        [key: string]: string;
    };
    nav: {
        home: string;
        products: string;
        cart: string;
        account: string;
        [key: string]: string;
    };
    meta: {
        homeTitle: string;
        homeDescription: string;
        productsTitle: string;
        productsDescription: string;
        cartTitle: string;
        cartDescription: string;
        [key: string]: string;
    };
    categories: {
        all: string;
        electronics: string;
        jewelery: string;
        mens_clothing: string;
        womens_clothing: string;
        [key: string]: string;
    };
    auth: {
        login: string;
        logout: string;
        register: string;
        email: string;
        password: string;
        forgotPassword: string;
        [key: string]: string;
    };
    filters: {
        title: string;
        category: string;
        priceRange: string;
        size: string;
        apply: string;
        clear: string;
        [key: string]: string;
    };
}

// ============================================
// AUTH / SESSION TİPLERİ (Auth0 için)
// ============================================

/**
 * Kullanıcı Rolü
 */
export type UserRole = "admin" | "user" | "guest";

/**
 * NextAuth.js Session User Tipi
 */
export interface SessionUser {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: UserRole;
}

/**
 * Extended NextAuth Session Tipi
 */
export interface AuthSession {
    user: SessionUser;
    accessToken: string;
    refreshToken?: string;
    expiresAt: number;
}

// ============================================
// SEO / METADATA TİPLERİ
// ============================================

/**
 * Sayfa Meta Bilgileri
 */
export interface PageMeta {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
}

// ============================================
// API SERVICE TİPLERİ
// ============================================

/**
 * API Response Wrapper
 */
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    error?: string;
}

/**
 * Ürün Filtreleme Parametreleri
 */
export interface ProductFilterParams {
    category?: Category;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: "price" | "title" | "rating";
    sortOrder?: "asc" | "desc";
    search?: string;
    limit?: number;
}

/**
 * Sepet Filtreleme Parametreleri
 */
export interface CartFilterParams {
    startdate?: string;
    enddate?: string;
    sort?: "asc" | "desc";
    limit?: number;
}

// ============================================
// COMPONENT PROPS TİPLERİ
// ============================================

/**
 * Layout Props - i18n destekli
 */
export interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

/**
 * Page Props - i18n + dynamic params
 */
export interface ProductPageProps {
    params: Promise<{ lang: string; id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Products Page Props
 */
export interface ProductsPageProps {
    params: Promise<{ lang: string }>;
    searchParams?: Promise<ProductFilterParams>;
}
