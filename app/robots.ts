/**
 * robots.txt Generator
 * Dinamik robots.txt oluşturur
 */

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shopilens.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/auth/", "/checkout/", "/account/", "/orders/"],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/api/", "/auth/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
