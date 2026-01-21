"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, getLocaleName, getLocaleFlag, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const switchLanguage = (newLocale: string) => {
        if (!pathname) return;

        // Remove the current locale from path and prepend the new one
        const segments = pathname.split("/");

        // Handle root path separately or ensure segments[1] is handled
        // Expected format: ["", "tr", "products", ...]
        if (segments.length >= 2) {
            segments[1] = newLocale;
        } else {
            // Should theoretically not happen in [lang] routes but safe fallback
            return router.push(`/${newLocale}`);
        }

        const newPath = segments.join("/");
        router.push(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="Change Language" className="rounded-full">
                    <span className="text-xl">{getLocaleFlag(currentLang as Locale)}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => switchLanguage(locale)}
                        className="cursor-pointer"
                    >
                        <span className="mr-2 text-xl">{getLocaleFlag(locale)}</span>
                        {getLocaleName(locale)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
