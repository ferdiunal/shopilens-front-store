import { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { LoginForm } from "@/components/auth/login-form";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Separator } from "@/components/ui/separator";
import { RegisterForm } from "@/components/auth/register-form";
import { useLocale } from "next-intl";

export const metadata: Metadata = {
    title: "Register - ShopiLens",
    description: "Register to your account",
};

export default function RegisterPage() {
    const locale = useLocale();
    return (
        <AuthLayout>
            <AuthHeader
                title="Welcome Back"
                description="Enter your details to access your account."
            />

            {/* Tabs (Visual only for now matching design) */}
            <div className="w-full">
                <div className="flex border-b border-border gap-8">
                    <Link href={`/${locale}/auth/login`} locale={locale} className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-3 px-2 outline-none focus:outline-none transition-colors">
                        <span className="text-sm font-bold leading-normal text-foreground">Sign In</span>
                    </Link>
                    <Link
                        href={`/${locale}/auth/register`}
                        locale={locale}
                        className="flex flex-col items-center justify-center border-b-[3px] border-b-[var(--primary)] pb-3 px-2 outline-none focus:outline-none transition-colors hover:text-foreground text-muted-foreground"
                    >
                        <span className="text-sm font-bold leading-normal">Create Account</span>
                    </Link>
                </div>
            </div>

            <RegisterForm />

            {/* Divider */}
            <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                    Or continue with
                </span>
                <div className="flex-grow border-t border-border"></div>
            </div>

            <SocialButtons />

            {/* Footer Text */}
            <p className="text-center text-sm text-muted-foreground mt-4">
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/register"
                    className="text-primary font-bold hover:underline"
                >
                    Sign up for free
                </Link>
            </p>
        </AuthLayout>
    );
}
