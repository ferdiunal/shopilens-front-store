"use client";

/**
 * Header Component
 * Sticky navigation, search, cart, theme toggle
 */

import Link from "next/link";
import { useTheme } from "next-themes";
import { Search, ShoppingBag, User, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/types";
import { useTranslations } from "next-intl";

interface HeaderProps {
    lang: string;
    dict: Dictionary;
    cartItemCount?: number;
}

export function Header({ lang, cartItemCount = 0 }: Omit<HeaderProps, "dict">) {
    const { theme, setTheme } = useTheme();
    const t = useTranslations();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border glass">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <Link href={`/${lang}`} className="flex items-center gap-2 group">
                            <div className="size-8 text-primary flex items-center justify-center">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0)">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M24 0.757L47.243 24L24 47.243L0.757 24L24 0.757ZM21 35.757V12.243L9.243 24L21 35.757Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <span className="text-lg font-bold tracking-tight">
                                ShopiLens
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href={`/${lang}/products`}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t('nav.products')}
                        </Link>
                        <Link
                            href={`/${lang}/products?category=electronics`}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t('categories.electronics')}
                        </Link>
                        <Link
                            href={`/${lang}/products?category=jewelery`}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {t('categories.jewelery')}
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search (Desktop) */}
                        <div className="hidden lg:flex relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder={t('common.search')}
                                className="w-64 pl-10 h-10"
                            />
                        </div>

                        {/* Search (Mobile) */}
                        <Button variant="ghost" size="icon" className="lg:hidden">
                            <Search className="size-5" />
                        </Button>

                        {/* Theme Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="hidden sm:flex"
                        >
                            <Sun className="size-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Cart */}
                        <Link href={`/${lang}/cart`}>
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingBag className="size-5" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 size-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* User */}
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <User className="size-5" />
                        </Button>

                        {/* Login (Desktop) */}
                        <Button className="hidden lg:flex" size="sm">
                            {t('auth.login')}
                        </Button>

                        {/* Mobile Menu */}
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="size-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
