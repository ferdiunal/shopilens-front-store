import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { SocialButtons } from "@/components/auth/social-buttons";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
    title: "Register - ShopiLens",
    description: "Register to your account",
};

export default async function RegisterPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: locale } = await params;
    const t = await getTranslations("auth");

    return (
        <AuthLayout>
            <AuthHeader
                title={t("createAccount")}
                description={t("signUpDescription")}
            />

            {/* Tabs */}
            <div className="w-full">
                <div className="flex border-b border-border gap-8">
                    <Link
                        href={`/${locale}/auth/login`}
                        className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pb-3 px-2 outline-none focus:outline-none transition-colors hover:text-foreground text-muted-foreground"
                    >
                        <span className="text-sm font-bold leading-normal">{t("signIn")}</span>
                    </Link>
                    <Link
                        href={`/${locale}/auth/register`}
                        className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-3 px-2 outline-none focus:outline-none transition-colors"
                    >
                        <span className="text-sm font-bold leading-normal text-foreground">{t("createAccount")}</span>
                    </Link>
                </div>
            </div>

            <RegisterForm />

            {/* Divider */}
            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                    {t("orContinueWith")}
                </span>
                <div className="flex-grow border-t border-border"></div>
            </div>

            <SocialButtons />

            {/* Footer Text */}
            <p className="text-center text-sm text-muted-foreground mt-4">
                {t("alreadyHaveAccount")}{" "}
                <Link
                    href={`/${locale}/auth/login`}
                    className="text-primary font-bold hover:underline"
                >
                    {t("signInHere")}
                </Link>
            </p>
        </AuthLayout>
    );
}
