import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const locales = ['en', 'tr'];
const defaultLocale = 'tr';

// Korumalı rotalar
const protectedRoutes = ["/checkout", "/profile", "/orders"];

// Auth rotaları (giriş yapmış kullanıcı erişemez)
const authRoutes = ["/auth/login", "/auth/register"];

const intlMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales,
    // Used when no locale matches
    defaultLocale
});

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Static files ve API routes'u atla (matcher hallediyor ama güvenlik için ekstra kontrol)
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

    // Auth kontrollerinden geçerse next-intl middleware'ini çalıştır
    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    // Proxy matcher ile next-intl matcher birleşimi
    matcher: ['/', '/(tr|en)/:path*', "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
