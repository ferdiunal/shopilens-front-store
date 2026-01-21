/**
 * NextAuth.js Konfigürasyonu
 * Auth0 Provider + JWT Session Strategy
 * 
 * NOT: AUTH0_CLIENT_ID tanımlı değilse provider boş olacaktır.
 */

import { AuthenticationClient } from "auth0";
import NextAuth, { type NextAuthOptions, type Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

// Auth0 credentials kontrolü
const isAuth0Configured = !!(
    process.env.AUTH0_CLIENT_ID &&
    process.env.AUTH0_CLIENT_SECRET &&
    process.env.AUTH0_ISSUER_BASE_URL
);

// Auth0 Authentication Client Yapılandırması
const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL?.replace("https://", "").replace("/", "");
const auth0ClientId = process.env.AUTH0_CLIENT_ID;

export const auth0 = new AuthenticationClient({
    domain: auth0Domain || "",
    clientId: auth0ClientId || "",
});

const isGoogleConfigured = !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
);

/**
 * NextAuth Options
 */
export const authOptions: NextAuthOptions = {
    providers: [
        ...(isAuth0Configured
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
            : []),

        ...(isGoogleConfigured
            ? [
                GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID!,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                }),
            ]
            : []),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                return {
                    id: btoa(credentials.email),
                    name: "User",
                    email: credentials.email,
                    role: "user",
                };
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 gün
    },

    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },

    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at;
                token.id = btoa(profile?.sub || (token.id as string));
                token.role = (profile as any)?.role || "user";
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                (session as any).accessToken = token.accessToken;
            }
            return session;
        },
    },

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
