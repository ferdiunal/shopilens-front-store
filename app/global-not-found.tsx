import "./globals.css";
import { getLocale } from "next-intl/server";
import { ErrorPage } from "@/components/error";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components/analytics/GoogleTagManager";
import { ThemeProvider } from "next-themes";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { NextIntlClientProvider } from "next-intl";

export default async function NotFound() {
    const locale = await getLocale();

    return <html lang="en" suppressHydrationWarning>
        <head>
            {/* Google Tag Manager - Head */}
            <GoogleTagManagerHead />

            {/* SEO JSON-LD */}
            <OrganizationJsonLd />
            <WebSiteJsonLd />

            {/* Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
                rel="stylesheet"
            />

            {/* Preconnect for API */}
            <link rel="preconnect" href="https://fakestoreapi.com" />
        </head>
        <body className="min-h-screen flex flex-col antialiased font-[family-name:Inter,sans-serif]">
            {/* Google Tag Manager - Body (noscript) */}
            <GoogleTagManagerBody />

            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <NextIntlClientProvider>
                    <ErrorPage type="404" lang={locale} />
                </NextIntlClientProvider>
            </ThemeProvider>
        </body>
    </html>
}