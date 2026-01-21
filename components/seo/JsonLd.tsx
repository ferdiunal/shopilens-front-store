/**
 * SEO Components
 * JSON-LD structured data ve meta tag helpers
 */

import type { Product } from "@/types";

/**
 * Organization JSON-LD
 * Site geneli organization bilgisi
 */
export function OrganizationJsonLd() {
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ShopiLens",
        url: process.env.NEXT_PUBLIC_APP_URL || "https://shopilens.com",
        logo: `${process.env.NEXT_PUBLIC_APP_URL || ""}/logo.png`,
        sameAs: [
            "https://twitter.com/shopilens",
            "https://facebook.com/shopilens",
            "https://instagram.com/shopilens",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-555-555-5555",
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
    );
}

/**
 * WebSite JSON-LD
 * Site geneli arama özelliği
 */
export function WebSiteJsonLd() {
    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ShopiLens",
        url: process.env.NEXT_PUBLIC_APP_URL || "https://shopilens.com",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || ""}/products?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
    );
}

/**
 * Product JSON-LD
 * Ürün detay sayfası için
 */
export function ProductJsonLd({ product, currency = "USD" }: { product: Product; currency?: string }) {
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.image,
        sku: String(product.id),
        category: product.category,
        offers: {
            "@type": "Offer",
            url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/products/${product.id}`,
            priceCurrency: currency,
            price: product.price,
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "ShopiLens",
            },
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.rate,
            reviewCount: product.rating.count,
            bestRating: 5,
            worstRating: 1,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
    );
}

/**
 * BreadcrumbList JSON-LD
 * Breadcrumb yapısı için
 */
export function BreadcrumbJsonLd({
    items,
}: {
    items: { name: string; url: string }[];
}) {
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
    );
}

/**
 * ItemList JSON-LD
 * Ürün listesi sayfası için
 */
export function ItemListJsonLd({ products }: { products: Product[] }) {
    const itemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        numberOfItems: products.length,
        itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Product",
                name: product.title,
                url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/products/${product.id}`,
                image: product.image,
                offers: {
                    "@type": "Offer",
                    price: product.price,
                    priceCurrency: "USD",
                },
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
    );
}
