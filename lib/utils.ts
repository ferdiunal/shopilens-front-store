import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - class name merge utility
 * clsx + tailwind-merge birleşimi
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Fiyat formatlama
 */
export function formatPrice(
    price: number,
    currency: string = "USD",
    locale: string = "en-US"
): string {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(price);
}

/**
 * Slug oluşturma
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}
