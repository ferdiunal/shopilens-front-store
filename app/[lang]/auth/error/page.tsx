"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

/**
 * Auth Error Page
 */
export default function AuthErrorPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const t = useTranslations("auth");

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
                    <AlertCircle className="w-10 h-10" />
                </div>

                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                        {t("errorOccurred")}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
                        {error || t("authenticationFailed")}
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/auth/login">
                            {t("tryAgain")}
                        </Link>
                    </Button>

                    <Button asChild variant="ghost" className="w-full">
                        <Link href="/" className="inline-flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t("backToHome")}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
