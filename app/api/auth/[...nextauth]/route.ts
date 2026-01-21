/**
 * NextAuth API Route Handler
 * Auth0 OAuth callback'lerini yönetir
 * 
 * NOT: AUTH0 credentials tanımlı değilse boş response döner.
 */

import { NextResponse } from "next/server";

// Auth0 credentials kontrolü - build time'da
const isAuth0Configured = !!(
    process.env.AUTH0_CLIENT_ID &&
    process.env.AUTH0_CLIENT_SECRET &&
    process.env.AUTH0_ISSUER_BASE_URL
);

// Conditional export
let GET: (request: Request) => Promise<Response>;
let POST: (request: Request) => Promise<Response>;

if (isAuth0Configured) {
    // Auth0 yapılandırılmış - NextAuth handlers'ı kullan
    const { GET: getHandler, POST: postHandler } = await import("@/lib/auth/auth");
    GET = getHandler;
    POST = postHandler;
} else {
    // Auth0 yapılandırılmamış - 503 döndür
    const notConfiguredHandler = async () => {
        return NextResponse.json(
            {
                error: "Authentication not configured",
                message: "Please set AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, and AUTH0_ISSUER_BASE_URL environment variables.",
            },
            { status: 503 }
        );
    };
    GET = notConfiguredHandler;
    POST = notConfiguredHandler;
}

export { GET, POST };
