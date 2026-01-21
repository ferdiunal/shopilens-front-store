/**
 * Ana Sayfa - SSG + ISR
 * Hero, Categories, Featured Products, Newsletter
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { ProductService } from "@/lib/api/product.service";
import type { Locale } from "@/lib/i18n/config";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryCards } from "@/components/home/category-cards";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";

// ISR: 1 saat
export const revalidate = 3600;

interface HomePageProps {
    params: Promise<{ lang: string }>;
}

/**
 * Dynamic Metadata
 */
export async function generateMetadata({
    params,
}: HomePageProps): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: dict.meta.homeTitle,
        description: dict.meta.homeDescription,
    };
}

export default async function HomePage({ params }: HomePageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    // Parallel data fetching
    const [featuredProducts, categories] = await Promise.all([
        ProductService.getFeatured(8),
        ProductService.getCategories(),
    ]);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-10">
                <HeroSection lang={lang} dict={dict} />
            </section>

            {/* Category Cards */}
            <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 pb-12">
                <CategoryCards lang={lang} dict={dict} categories={categories} />
            </section>

            {/* Featured Products */}
            <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        {dict.products.featuredTitle}
                    </h2>
                    <p className="text-muted-foreground">
                        {dict.products.featuredDescription}
                    </p>
                </div>

                <ProductGrid
                    products={featuredProducts}
                    lang={lang}
                    columns={4}
                    addToCartLabel={dict.common.addToCart}
                />

                {/* View All Button */}
                <div className="mt-12 flex justify-center">
                    <Link href={`/${lang}/products`}>
                        <Button variant="outline" size="lg">
                            {dict.common.viewAll}
                            <ArrowRight className="size-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Newsletter */}
            <NewsletterForm dict={dict} />
        </div>
    );
}
