"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

/**
 * Login Page
 * Auth0 ile giriş butonunu içerir
 */
export default function LoginPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleLogin = () => {
        signIn("auth0", { callbackUrl });
    };

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-foreground">
                        Hoş Geldiniz
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                        ShopILens hesabınıza giriş yapın
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <Button
                        size="lg"
                        className="w-full h-12 text-lg font-medium"
                        onClick={handleLogin}
                    >
                        <LogIn className="mr-2 h-5 w-5" />
                        Auth0 ile Giriş Yap
                    </Button>

                    <p className="text-xs text-muted-foreground">
                        Giriş yaparak kullanım koşullarımızı ve gizlilik politikamızı kabul etmiş olursunuz.
                    </p>
                </div>
            </div>

            {/* Arka plan süslemeleri */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
