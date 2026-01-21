"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock, RefreshCw, Home, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type ErrorType = "403" | "404" | "500";

interface ErrorPageProps {
    type: ErrorType;
    lang?: string;
}

export function ErrorPage({ type, lang = "tr" }: ErrorPageProps) {
    const locale = useLocale()
    const t = useTranslations("errors");
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const renderIcon = () => {
        switch (type) {
            case "403":
                return (
                    <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-card border border-border shadow-2xl">
                        <Lock className="h-16 w-16 text-primary" />
                        <div className="absolute -bottom-2 bg-destructive/10 border border-destructive/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            <span className="text-xs font-bold text-destructive tracking-wider">
                                {t("403.restricted")}
                            </span>
                        </div>
                    </div>
                );
            case "404":
                return null;
            case "500":
                return (
                    <div className="flex items-center justify-center gap-2 text-primary font-medium uppercase tracking-widest text-sm mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{t("500.systemMalfunction")}</span>
                    </div>
                );
        }
    };

    const getGradientClass = () => {
        switch (type) {
            case "403":
                return "from-foreground to-foreground/20";
            case "404":
                return "from-primary to-primary/60";
            case "500":
                return "from-foreground to-muted-foreground";
        }
    };

    return (
        <main className="flex-grow flex items-center justify-center p-6 relative">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="flex flex-col items-center max-w-[600px] w-full z-10">
                <div className="flex flex-col items-center gap-8 px-4 py-6">
                    {/* Icon & Heading Group */}
                    <div className="flex flex-col items-center justify-center gap-4">
                        {renderIcon()}

                        <div className={cn("text-center space-y-2", type === "403" && "mt-4")}>
                            <h1 className={cn(
                                "font-black text-transparent bg-clip-text tracking-tighter leading-none select-none",
                                `bg-gradient-to-b ${getGradientClass()}`,
                                type === "404" ? "text-[140px] md:text-[200px] drop-shadow-2xl" : "text-8xl"
                            )}>
                                {t(`${type}.title`)}
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                                {t(`${type}.heading`)}
                            </h2>
                        </div>
                    </div>

                    {/* Divider for 403 */}
                    {type === "403" && (
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    )}

                    {/* Description */}
                    <div className="flex max-w-[480px] flex-col items-center gap-6">
                        <p className="text-muted-foreground text-base font-normal leading-relaxed text-center">
                            {t(`${type}.description`)}
                        </p>

                        {/* Search bar for 404 */}
                        {type === "404" && (
                            <div className="w-full max-w-md space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <Input
                                        type="text"
                                        placeholder={t("searchProducts")}
                                        className="pl-12 pr-4 py-6 rounded-xl"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col w-full gap-4 items-center pt-2">
                            {type === "500" ? (
                                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <Button
                                        onClick={handleRefresh}
                                        className="gap-2 shadow-lg shadow-primary/20"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        {t("refreshPage")}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        asChild
                                    >
                                        <a href={`/${lang}`} className="gap-2">
                                            <ArrowLeft className="h-4 w-4" />
                                            {t("returnHome")}
                                        </a>
                                    </Button>
                                </div>
                            ) : type === "404" ? (
                                <Button
                                    asChild
                                    className="w-full gap-2 py-6 shadow-lg shadow-primary/20"
                                >
                                    <a href={`/${lang}`}>
                                        {t("returnHome")}
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={handleGoBack}
                                        className="w-full sm:w-auto min-w-[200px] gap-2 shadow-lg shadow-primary/20"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        {t("goBack")}
                                    </Button>
                                    <a
                                        href="#"
                                        className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-2 text-sm font-medium"
                                    >
                                        <span>{t("contactSupport")}</span>
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </>
                            )}
                        </div>

                        {/* Helpful Links for 404 */}
                        {type === "404" && (
                            <div className="pt-6 flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground">
                                <a href={`/${lang}/products`} className="hover:text-primary transition-colors">
                                    {t("newArrivals")}
                                </a>
                                <a href={`/${lang}/products`} className="hover:text-primary transition-colors">
                                    {t("bestSellers")}
                                </a>
                                <a href="#" className="hover:text-primary transition-colors">
                                    {t("helpCenter")}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
