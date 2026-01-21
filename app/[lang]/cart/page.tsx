/**
 * Sepet Sayfası
 * Client-side state ile çalışır
 */

import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { Metadata } from "next";
import Link from "next/link";

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
    const dict = await getDictionary(lang as Locale);

    return {
        title: dict.meta.cartTitle,
        description: dict.meta.cartDescription,
    };
}

export default async function CartPage({ params }: CartPageProps) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{dict.cart.title}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sepet Listesi */}
                <div className="lg:col-span-2">
                    <div className="bg-white border rounded-lg p-6">
                        {/* Client component buraya eklenecek - CartList */}
                        <p className="text-gray-500 text-center py-8">
                            {dict.cart.empty}
                        </p>

                        <div className="mt-6 pt-6 border-t">
                            <Link
                                href={`/${lang}/products`}
                                className="text-blue-600 hover:underline"
                            >
                                ← {dict.cart.continueShopping}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Sipariş Özeti */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 border rounded-lg p-6 sticky top-4">
                        <h2 className="text-xl font-semibold mb-4">
                            {dict.cart.subtotal}
                        </h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between">
                                <span>{dict.cart.subtotal}</span>
                                <span>{dict.common.currency}0.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-3">
                                <span>{dict.cart.total}</span>
                                <span>{dict.common.currency}0.00</span>
                            </div>
                        </div>

                        <button
                            disabled
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {dict.cart.checkout}
                        </button>

                        <button
                            disabled
                            className="w-full mt-3 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {dict.cart.clearCart}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
