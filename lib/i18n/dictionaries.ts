/**
 * Dictionary Loader
 * Dinamik import ile dil dosyalarını yükler
 */

import type { Locale, Dictionary } from "@/types";

/**
 * Dictionary importları
 * Dynamic import ile bundle size optimize edilir
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    tr: () => import("@/dictionaries/tr.json").then((m) => m.default as Dictionary),
    en: () => import("@/dictionaries/en.json").then((m) => m.default as Dictionary),
};

/**
 * Belirtilen locale için dictionary'yi yükler
 * Server Components'ta kullanılır
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
    const loadDictionary = dictionaries[locale];

    if (!loadDictionary) {
        // Fallback to default locale
        console.warn(`Dictionary not found for locale: ${locale}, falling back to 'tr'`);
        return dictionaries.tr();
    }

    return loadDictionary();
}

/**
 * Kategori adını çevir
 * API'den gelen kategori slug'ını kullanıcı dostu isme çevirir
 */
export function translateCategory(
    category: string,
    dict: Dictionary
): string {
    const categoryMap: Record<string, keyof Dictionary["categories"]> = {
        electronics: "electronics",
        jewelery: "jewelery",
        "men's clothing": "mensClothing",
        "women's clothing": "womensClothing",
    };

    const key = categoryMap[category];
    return key ? dict.categories[key] : category;
}
