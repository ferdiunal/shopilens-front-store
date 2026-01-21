import { getLocale } from "next-intl/server";
import { ErrorPage } from "@/components/error";

export default async function Unauthorized() {
    const locale = await getLocale();

    return <ErrorPage type="403" lang={locale} />;
}
