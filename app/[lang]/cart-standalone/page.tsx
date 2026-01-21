/**
 * Sepet Sayfası
 * Server Component - metadata ve layout
 * Client Component'i render eder
 */

import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CartClient } from "./client";

interface CartPageProps {
    params: Promise<{ lang: string }>;
}

/**
 * Dynamic Metadata
 */
export async function generateMetadata({
    params,
}: CartPageProps): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "meta" });

    return {
        title: t('cartTitle'),
        description: t('cartDescription'),
    };
}

export default async function CartPage({ params }: CartPageProps) {
    const { lang } = await params;

    return <CartClient lang={lang} />;
}
