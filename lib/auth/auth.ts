/**
 * NextAuth.js Konfigürasyonu
 * Auth0 Provider + JWT Session Strategy
 * 
 * NOT: AUTH0_CLIENT_ID tanımlı değilse provider boş olacaktır.
 */

import NextAuth, { type NextAuthOptions, type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import Auth0Provider from "next-auth/providers/auth0";

// Auth0 credentials kontrolü
const isAuth0Configured = !!(
    process.env.AUTH0_CLIENT_ID &&
    process.env.AUTH0_CLIENT_SECRET &&
    process.env.AUTH0_ISSUER_BASE_URL
);

/**
 * NextAuth Options
 */
export const authOptions: NextAuthOptions = {
    providers: isAuth0Configured
        ? [
            Auth0Provider({
                clientId: process.env.AUTH0_CLIENT_ID!,
                clientSecret: process.env.AUTH0_CLIENT_SECRET!,
                issuer: process.env.AUTH0_ISSUER_BASE_URL!,
                authorization: {
                    params: {
                        scope: "openid email profile",
                    },
                },
            }),
        ]
        : [],

    // JWT Session Strategy
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 gün
    },

    // Pages
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },

    // Callbacks
    callbacks: {
        /**
         * JWT Callback
         * Token'a ekstra bilgi ekle
         */
        async jwt({ token, account, profile }) {
            // İlk login'de account bilgilerini token'a ekle
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
                token.id = profile?.sub;

                // Rol bazlı yetkilendirme (Auth0 custom claims'den veya mock)
                token.role = (profile as any)?.role || "user";
            }

            return token;
        },

        /**
         * Session Callback
         * Client'a gönderilecek session verisini oluştur
         */
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                (session as any).accessToken = token.accessToken;
            }
            return session;
        },
    },

    // Debug (development only)
    debug: process.env.NODE_ENV === "development",
};

/**
 * Handler for API Routes
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, isAuth0Configured };

/**
 * Protected Routes Helper
 */
export const protectedRoutes = ["/checkout", "/account", "/orders"];

export function isProtectedRoute(pathname: string): boolean {
    return protectedRoutes.some((route) => pathname.includes(route));
}
