"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

/**
 * Logout Page
 * Kullanıcıyı oturumdan çıkarır ve ana sayfaya yönlendirir
 */
export default function LogoutPage() {
    const router = useRouter();
    const t = useTranslations("auth");

    useEffect(() => {
        const performLogout = async () => {
            await signOut({ redirect: false });
            router.push("/");
        };

        performLogout();
    }, [router]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
            <div className="animate-pulse space-y-4 text-center">
                <h2 className="text-2xl font-semibold">{t("loggingOut")}</h2>
                <p className="text-muted-foreground text-sm">{t("pleaseWait")}</p>
            </div>
        </div>
    );
}
