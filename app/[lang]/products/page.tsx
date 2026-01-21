/**
 * Ürünler Sayfası - SSG + ISR
 * Sidebar filtreler, ürün grid
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ProductService } from "@/lib/api/product.service";
import { getTranslations } from "next-intl/server";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

// Dynamic page for search params
export const dynamic = "force-dynamic";

interface ProductsPageProps {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ category?: string; sort?: string }>;
}

/**
 * Dynamic Metadata
 */
export async function generateMetadata({
    params,
}: ProductsPageProps): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "meta" });

    return {
        title: t('productsTitle'),
        description: t('productsDescription'),
    };
}

export default async function ProductsPage({
    params,
    searchParams,
}: ProductsPageProps) {
    const { lang } = await params;
    const { category, sort } = await searchParams;
    const t = await getTranslations({ locale: lang });

    // Data fetching
    const [products, categories] = await Promise.all([
        category
            ? ProductService.getByCategory(category as import("@/types").Category)
            : ProductService.getAll(),
        ProductService.getCategories(),
    ]);

    // Sort products
    let sortedProducts = [...products];
    if (sort === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Custom breadcrumb translation helper if needed, or just use t
    // The dict.nav.home -> t('nav.home')

    // Breadcrumb items
    const breadcrumbItems = [
        { label: t('nav.home'), href: `/${lang}` },
        { label: t('nav.products'), href: category ? `/${lang}/products` : undefined },
        ...(category ? [{ label: category }] : []),
    ];

    // Kategori çevirisi
    const translateCategory = (cat: string): string => {
        const key = cat.replace("'s ", "_").replace(" ", "_").toLowerCase();
        // t.has check is optional if we trust keys, but good for safety
        // Trying to access t(`categories.${key}`)
        // Note: next-intl t is type safe if generated, otherwise loose string
        return t.has(`categories.${key}`) ? t(`categories.${key}`) : cat;
    };

    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10">
            {/* Breadcrumbs */}
            <Breadcrumb items={breadcrumbItems} className="mb-6" />

            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        {category ? translateCategory(category) : t('products.title')}
                    </h1>
                    <p className="text-muted-foreground">{t('products.description')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {sortedProducts.length} {t('products.title').toLowerCase()}
                    </span>
                    {/* Sort Dropdown */}
                    <div className="relative group">
                        <Button variant="outline" size="sm">
                            {t('products.sortBy')}: {t('products.featured')}
                            <ChevronDown className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Layout Grid */}
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="lg:sticky lg:top-24 flex flex-col gap-4">
                        {/* Category Filter */}
                        <details
                            className="group bg-card rounded-xl border border-border overflow-hidden"
                            open
                        >
                            <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-accent transition-colors select-none">
                                <span className="font-semibold">{t('filters.category')}</span>
                                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 pt-0">
                                <div className="space-y-3 pt-2">
                                    <Link
                                        href={`/${lang}/products`}
                                        className="flex items-center gap-3 group/item"
                                    >
                                        <Checkbox checked={!category} />
                                        <span className="text-muted-foreground group-hover/item:text-primary transition-colors">
                                            {t('categories.all')}
                                        </span>
                                    </Link>
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat}
                                            href={`/${lang}/products?category=${encodeURIComponent(cat)}`}
                                            className="flex items-center gap-3 group/item"
                                        >
                                            <Checkbox checked={category === cat} />
                                            <span className="text-muted-foreground group-hover/item:text-primary transition-colors">
                                                {translateCategory(cat)}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </details>

                        {/* Price Filter */}
                        <details className="group bg-card rounded-xl border border-border overflow-hidden">
                            <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-accent transition-colors select-none">
                                <span className="font-semibold">{t('filters.priceRange')}</span>
                                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="px-4 pb-4 pt-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                                    />
                                    <span className="text-muted-foreground">-</span>
                                    <input
                                        type="number"
                                        placeholder="500"
                                        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                                    />
                                </div>
                                <Button variant="secondary" className="w-full mt-3" size="sm">
                                    {t('filters.apply')}
                                </Button>
                            </div>
                        </details>
                    </div>
                </aside>

                {/* Product Grid */}
                <section className="flex-1">
                    {sortedProducts.length > 0 ? (
                        <ProductGrid
                            products={sortedProducts}
                            lang={lang}
                            columns={3}
                            addToCartLabel={t('common.addToCart')}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-muted-foreground text-lg">
                                {t('products.noProducts')}
                            </p>
                            <Link href={`/${lang}/products`}>
                                <Button variant="outline" className="mt-4">
                                    {t('filters.clear')}
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Load More */}
                    {sortedProducts.length > 0 && (
                        <div className="mt-12 flex justify-center">
                            <Button variant="outline" size="lg">
                                Load More Products
                            </Button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
