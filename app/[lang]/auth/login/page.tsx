import { Metadata } from "next";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { LoginForm } from "@/components/auth/login-form";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Login - ShopiLens",
    description: "Login to your account",
};

export default function LoginPage() {
    return (
        <AuthLayout>
            <AuthHeader
                title="Welcome Back"
                description="Enter your details to access your account."
            />

            {/* Tabs (Visual only for now matching design) */}
            <div className="w-full">
                <div className="flex border-b border-border gap-8">
                    <button className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-3 px-2 outline-none focus:outline-none transition-colors">
                        <span className="text-sm font-bold leading-normal text-foreground">Sign In</span>
                    </button>
                    <Link
                        href="/auth/register"
                        className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent pb-3 px-2 outline-none focus:outline-none transition-colors hover:text-foreground text-muted-foreground"
                    >
                        <span className="text-sm font-bold leading-normal">Create Account</span>
                    </Link>
                </div>
            </div>

            <LoginForm />

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
