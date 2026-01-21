import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/analytics/GoogleTagManager";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopILens",
  description: "E-commerce Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
