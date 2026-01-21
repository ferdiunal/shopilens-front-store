/**
 * Footer Component
 * Links, social icons, copyright
 */

import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import type { Dictionary } from "@/types";

interface FooterProps {
    lang: string;
    dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
    return (
        <footer className="border-t border-border bg-card mt-auto">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="size-6 text-primary">
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24 0.757L47.243 24L24 47.243L0.757 24L24 0.757ZM21 35.757V12.243L9.243 24L21 35.757Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <span className="font-bold text-lg">ShopiLens</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <Link
                            href="#"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Shipping
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Returns
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            FAQ
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Social */}
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Instagram className="size-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Twitter className="size-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} ShopiLens. {dict.common.allRightsReserved}
                    </p>
                </div>
            </div>
        </footer>
    );
}
