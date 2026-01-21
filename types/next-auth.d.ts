/**
 * NextAuth Types Extension
 * Session ve JWT tiplerine ekstra alanlar ekler
 */

import type { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role?: string;
        } & DefaultSession["user"];
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id?: string;
        role?: string;
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
    }
}
