import { getLocale } from "next-intl/server";
import { ErrorPage } from "@/components/error";

export default async function NotFound() {
    const locale = await getLocale();

    return <ErrorPage type="404" lang={locale} />;
}
