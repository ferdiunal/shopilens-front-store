/**
 * i18n Konfigürasyonu
 * Desteklenen diller ve yardımcı fonksiyonlar
 */

export const locales = ["tr", "en"] as const;
export const defaultLocale = "tr" as const;

export type Locale = (typeof locales)[number];

/**
 * Verilen string'in geçerli bir locale olup olmadığını kontrol eder
 */
export function isValidLocale(locale: string): locale is Locale {
    return locales.includes(locale as Locale);
}

/**
 * Locale'e göre dil adını döndürür
 */
export function getLocaleName(locale: Locale): string {
    const names: Record<Locale, string> = {
        tr: "Türkçe",
        en: "English",
    };
    return names[locale];
}

/**
 * Locale'e göre bayrak emoji döndürür
 */
export function getLocaleFlag(locale: Locale): string {
    const flags: Record<Locale, string> = {
        tr: "🇹🇷",
        en: "🇬🇧",
    };
    return flags[locale];
}

/**
 * URL'den locale bilgisini çıkarır
 */
export function extractLocaleFromPath(pathname: string): Locale {
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0];

    if (firstSegment && isValidLocale(firstSegment)) {
        return firstSegment;
    }

    return defaultLocale;
}

/**
 * Alternatif dil URL'lerini oluşturur (SEO için)
 */
export function getAlternateLanguages(
    pathname: string
): { lang: Locale; url: string }[] {
    const currentLocale = extractLocaleFromPath(pathname);
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");

    return locales.map((locale) => ({
        lang: locale,
        url: `/${locale}${pathWithoutLocale}`,
    }));
}
