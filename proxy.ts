/**
 * Next.js Middleware
 * Auth koruması ve locale redirects
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { locales, defaultLocale } from "@/lib/i18n/config";

// Korumalı rotalar
const protectedRoutes = ["/checkout", "/account", "/orders"];

// Auth rotaları (giriş yapmış kullanıcı erişemez)
const authRoutes = ["/auth/login", "/auth/register"];

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Static files ve API routes'u atla
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // JWT Token kontrol
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isLoggedIn = !!token;

    // Korumalı rota kontrolü
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.includes(route)
    );

    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL(`/${defaultLocale}/auth/login`, request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Auth route kontrolü (zaten giriş yapmış)
    const isAuthRoute = authRoutes.some((route) => pathname.includes(route));

    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    // Locale kontrolü - root path
    const pathnameLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameLocale && pathname === "/") {
        // Root'tan default locale'e yönlendir
        return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Tüm path'leri yakala, static files hariç
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};
