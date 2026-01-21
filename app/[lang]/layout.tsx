/**
 * Language Layout - i18n destekli
 * Header, Footer ve StoreProvider ile sarmalanmış
 * Not: html, head ve body etiketleri kök layout'ta (app/layout.tsx) 
 */

import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { StoreProvider } from "@/lib/store/provider";
import { AuthProvider } from "@/components/providers/session-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";

interface LanguageLayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}

/**
 * Viewport Configuration
 */
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f6f7f8" },
        { media: "(prefers-color-scheme: dark)", color: "#111921" },
    ],
};

/**
 * SSG: Tüm desteklenen diller için statik sayfa oluştur
 */
export async function generateStaticParams() {
    return locales.map((lang) => ({ lang }));
}

/**
 * Dynamic Metadata
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "meta" });
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shopilens.com";

    return {
        metadataBase: new URL(baseUrl),
        title: {
            default: t('homeTitle'),
            template: `%s | ShopiLens`,
        },
        description: t('homeDescription'),
        keywords: [
            "e-commerce",
            "online shopping",
            "electronics",
            "jewelry",
            "clothing",
        ],
        authors: [{ name: "ShopiLens Team" }],
        creator: "ShopiLens",
        openGraph: {
            type: "website",
            locale: lang === "tr" ? "tr_TR" : "en_US",
            url: baseUrl,
            siteName: "ShopiLens",
            title: t('homeTitle'),
            description: t('homeDescription'),
        },
        twitter: {
            card: "summary_large_image",
            title: t('homeTitle'),
            description: t('homeDescription'),
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${baseUrl}/${lang}`,
            languages: {
                tr: `${baseUrl}/tr`,
                en: `${baseUrl}/en`,
            },
        },
    };
}

export default async function LanguageLayout({ children, params }: LanguageLayoutProps) {
    const { lang } = await params;

    // Geçersiz locale kontrolü
    if (!locales.includes(lang as Locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <StoreProvider>
            <AuthProvider>
                <NextIntlClientProvider messages={messages}>
                    <Header lang={lang} />
                    <main className="flex-grow">{children}</main>
                    <Footer lang={lang} />
                </NextIntlClientProvider>
            </AuthProvider>
        </StoreProvider>
    );
}
