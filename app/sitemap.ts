/**
 * Sitemap Generator
 * Dinamik sitemap.xml oluşturur
 */

import type { MetadataRoute } from "next";
import { ProductService } from "@/lib/api/product.service";
import { locales } from "@/lib/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shopilens.com";

    // Statik sayfalar
    const staticPages: MetadataRoute.Sitemap = [];

    // Her dil için ana sayfalar
    for (const locale of locales) {
        staticPages.push(
            {
                url: `${baseUrl}/${locale}`,
                lastModified: new Date(),
                changeFrequency: "daily",
                priority: 1,
            },
            {
                url: `${baseUrl}/${locale}/products`,
                lastModified: new Date(),
                changeFrequency: "daily",
                priority: 0.9,
            },
            {
                url: `${baseUrl}/${locale}/cart`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 0.5,
            }
        );
    }

    // Dinamik ürün sayfaları
    const productPages: MetadataRoute.Sitemap = [];
    try {
        const products = await ProductService.getAll();
        for (const locale of locales) {
            for (const product of products) {
                productPages.push({
                    url: `${baseUrl}/${locale}/products/${product.id}`,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.8,
                });
            }
        }
    } catch (error) {
        console.warn("Sitemap generation warning: Failed to fetch products", error);
    }

    // Kategori sayfaları
    const categoryPages: MetadataRoute.Sitemap = [];
    try {
        const categories = await ProductService.getCategories();
        for (const locale of locales) {
            for (const category of categories) {
                categoryPages.push({
                    url: `${baseUrl}/${locale}/products?category=${encodeURIComponent(category)}`,
                    lastModified: new Date(),
                    changeFrequency: "daily",
                    priority: 0.7,
                });
            }
        }
    } catch (error) {
        console.warn("Sitemap generation warning: Failed to fetch categories", error);
    }

    return [...staticPages, ...productPages, ...categoryPages];
}
