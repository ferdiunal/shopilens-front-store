"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const t = useTranslations("auth");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
            setIsLoading(true);

            const formData = new FormData(event.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const result = await signIn("credentials", {
                email,
                password,
            }, {
                callbackUrl: "/",
            });
        } catch (error) {
            console.error("Login Error:", error);
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                    {t("emailAddress")}
                </Label>
                <div className="relative">
                    <Input
                        id="email"
                        name="email"
                        placeholder={t("emailPlaceholder")}
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        className="h-12 border-muted-foreground/20 focus-visible:ring-primary/50"
                        required
                    />
                    <span className="absolute right-4 top-3 text-muted-foreground pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                    </span>
                </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">
                        {t("password")}
                    </Label>
                    <Link
                        href="/auth/forgot-password"
                        className="text-primary text-xs font-semibold hover:underline"
                    >
                        {t("forgotPassword")}
                    </Link>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        placeholder={t("enterPassword")}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        disabled={isLoading}
                        className="h-12 border-muted-foreground/20 focus-visible:ring-primary/50 pr-12"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                        {showPassword ? (
                            <EyeOff className="size-5" />
                        ) : (
                            <Eye className="size-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="mt-2 w-full h-12 text-sm font-bold shadow-lg shadow-primary/20"
                disabled={isLoading}
            >
                {isLoading ? t("signingIn") : t("signIn")}
            </Button>
        </form>
    );
}
