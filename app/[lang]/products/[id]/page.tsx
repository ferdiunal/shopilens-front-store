/**
 * Ürün Detay Sayfası - SSG + ISR
 * Mikro mimari ile yapılandırılmış
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ProductService } from "@/lib/api/product.service";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Separator } from "@/components/ui/separator";

// Mikro bileşenler
import {
    ProductInfo,
    ProductPrice,
    ProductRating,
    ProductAccordion,
} from "@/components/product/detail";

// Client bileşeni
import { ProductDetailClient } from "./client";

// ISR: 30 dakika
export const revalidate = 1800;

interface ProductDetailPageProps {
    params: Promise<{ lang: string; id: string }>;
}

/**
 * SSG: Tüm ürün sayfalarını önceden oluştur
 */
export async function generateStaticParams() {
    const productIds = await ProductService.getAllIds();

    // Her dil için her ürün
    const params = [];
    for (const lang of locales) {
        for (const { id } of productIds) {
            params.push({ lang, id });
        }
    }

    return params;
}

/**
 * Dynamic Metadata
 */
export async function generateMetadata({
    params,
}: ProductDetailPageProps): Promise<Metadata> {
    const { lang, id } = await params;
    const product = await ProductService.getById(Number(id));

    if (!product) {
        return { title: "Product Not Found" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shopilens.com";

    return {
        title: product.title,
        description: product.description.slice(0, 160),
        openGraph: {
            title: product.title,
            description: product.description.slice(0, 160),
            images: [{ url: product.image, width: 600, height: 600 }],
            url: `${baseUrl}/${lang}/products/${id}`,
        },
    };
}

export default async function ProductDetailPage({
    params,
}: ProductDetailPageProps) {
    const { lang, id } = await params;
    const dict = await getDictionary(lang as Locale);
    const product = await ProductService.getById(Number(id));

    if (!product) {
        notFound();
    }

    // Breadcrumb items
    const breadcrumbItems = [
        { label: dict.nav.home, href: `/${lang}` },
        { label: dict.nav.products, href: `/${lang}/products` },
        { label: product.category, href: `/${lang}/products?category=${encodeURIComponent(product.category)}` },
        { label: product.title },
    ];

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

    // İndirim hesaplama (ilk 5 ürün için demo)
    const hasDiscount = product.id <= 5;
    const discountPercent = hasDiscount ? 20 : undefined;
    const originalPrice = hasDiscount ? product.price * 1.25 : undefined;

    // Accordion bölümleri
    const accordionSections = [
        {
            id: "description",
            title: "Description",
            content: (
                <p>{product.description}</p>
            ),
        },
        {
            id: "shipping",
            title: "Shipping & Returns",
            content: (
                <p>
                    Free standard shipping on all orders over $100. We offer a 30-day
                    return policy for unworn items in their original packaging.
                </p>
            ),
        },
        {
            id: "materials",
            title: "Materials & Care",
            content: (
                <p>
                    High-quality materials sourced responsibly. Please refer to the
                    product label for specific care instructions.
                </p>
            ),
        },
    ];

    return (
        <>
            {/* SEO JSON-LD */}
            <ProductJsonLd product={product} />
            <BreadcrumbJsonLd
                items={breadcrumbItems.map((item) => ({
                    name: item.label,
                    url: item.href ? `${baseUrl}${item.href}` : `${baseUrl}/${lang}/products/${id}`,
                }))}
            />

            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
                {/* Breadcrumbs */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left: Gallery */}
                    <div className="w-full lg:w-[60%]">
                        <ProductGallery
                            images={[product.image]}
                            title={product.title}
                            badge={product.id <= 3 ? "New Arrival" : undefined}
                        />
                    </div>

                    {/* Right: Info */}
                    <div className="w-full lg:w-[40%] flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
                        {/* Title & Favorite */}
                        <div className="space-y-4 border-b border-border pb-6">
                            <ProductInfo title={product.title} />

                            {/* Price */}
                            <ProductPrice
                                price={product.price}
                                originalPrice={originalPrice}
                                discountPercent={discountPercent}
                            />

                            {/* Rating */}
                            <ProductRating
                                rate={product.rating.rate}
                                count={product.rating.count}
                            />

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed pt-2">
                                {product.description}
                            </p>
                        </div>

                        {/* Interactive Client Section */}
                        <ProductDetailClient
                            product={product}
                            addToCartLabel={dict.common.addToCart}
                        />

                        {/* Accordion Info */}
                        <div className="mt-4">
                            <ProductAccordion
                                sections={accordionSections}
                                defaultOpen="description"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
