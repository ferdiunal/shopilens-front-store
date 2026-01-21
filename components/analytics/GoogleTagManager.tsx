/**
 * Google Tag Manager Component
 * Head ve Body scriptlerini yönetir
 */

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * GTM Head Script
 * <head> tag'ına eklenir
 */
export function GoogleTagManagerHead() {
    if (!GTM_ID) return null;

    return (
        <Script
            id="gtm-head"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
            }}
        />
    );
}

/**
 * GTM Body NoScript
 * <body> tag'ının hemen altına eklenir
 */
export function GoogleTagManagerBody() {
    if (!GTM_ID) return null;

    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            />
        </noscript>
    );
}

/**
 * GTM Event Push Helper
 * Custom event'leri dataLayer'a push eder
 */
export function pushToDataLayer(event: Record<string, unknown>) {
    if (typeof window !== "undefined" && GTM_ID) {
        // @ts-expect-error - dataLayer global olarak tanımlı
        window.dataLayer = window.dataLayer || [];
        // @ts-expect-error - dataLayer global olarak tanımlı
        window.dataLayer.push(event);
    }
}

/**
 * E-commerce Events
 */
export const GTMEvents = {
    // Ürün görüntüleme
    viewItem: (product: { id: string; name: string; price: number; category: string }) => {
        pushToDataLayer({
            event: "view_item",
            ecommerce: {
                currency: "USD",
                value: product.price,
                items: [
                    {
                        item_id: product.id,
                        item_name: product.name,
                        item_category: product.category,
                        price: product.price,
                    },
                ],
            },
        });
    },

    // Sepete ekleme
    addToCart: (product: { id: string; name: string; price: number; quantity: number }) => {
        pushToDataLayer({
            event: "add_to_cart",
            ecommerce: {
                currency: "USD",
                value: product.price * product.quantity,
                items: [
                    {
                        item_id: product.id,
                        item_name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                    },
                ],
            },
        });
    },

    // Sepetten çıkarma
    removeFromCart: (product: { id: string; name: string; price: number; quantity: number }) => {
        pushToDataLayer({
            event: "remove_from_cart",
            ecommerce: {
                currency: "USD",
                value: product.price * product.quantity,
                items: [
                    {
                        item_id: product.id,
                        item_name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                    },
                ],
            },
        });
    },

    // Checkout başlatma
    beginCheckout: (items: { id: string; name: string; price: number; quantity: number }[], total: number) => {
        pushToDataLayer({
            event: "begin_checkout",
            ecommerce: {
                currency: "USD",
                value: total,
                items: items.map((item) => ({
                    item_id: item.id,
                    item_name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        });
    },

    // Satın alma
    purchase: (transactionId: string, items: { id: string; name: string; price: number; quantity: number }[], total: number) => {
        pushToDataLayer({
            event: "purchase",
            ecommerce: {
                transaction_id: transactionId,
                currency: "USD",
                value: total,
                items: items.map((item) => ({
                    item_id: item.id,
                    item_name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            },
        });
    },
};
