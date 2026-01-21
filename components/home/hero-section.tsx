/**
 * Hero Section Component
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/types";

interface HeroSectionProps {
    lang: string;
    dict: Dictionary;
}

export function HeroSection({ lang, dict }: HeroSectionProps) {
    return (
        <div className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden rounded-xl p-8 text-center shadow-sm">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80")`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl animate-fade-in">
                <h1 className="text-white text-5xl font-black leading-tight tracking-tight sm:text-6xl drop-shadow-md">
                    {dict.meta.homeTitle}
                </h1>
                <p className="text-white/90 text-lg font-medium sm:text-xl drop-shadow-sm">
                    {dict.meta.homeDescription}
                </p>
                <Link href={`/${lang}/products`}>
                    <Button
                        size="xl"
                        className="mt-4 bg-white text-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
                    >
                        {dict.common.shopNow}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
