"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function RegisterForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const t = useTranslations("auth");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // 1. Kendi API'mize kayıt isteği gönder (Auth0 SDK kullanıyor)
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || t("registrationFailed"));
            }

            // 2. Kayıt başarılı, şimdi NextAuth ile oturum aç
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(t("registrationSuccessLoginFailed"));
                setIsLoading(false);
                return;
            }

            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message || t("somethingWentWrong"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
                    {t("createAccount")}
                </h1>
                <p className="mt-2 text-base text-muted-foreground">
                    {t("signUpDescription")}
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                    {error}
                </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="font-medium">
                    {t("fullName")}
                </Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("fullNamePlaceholder")}
                    required
                    className="h-12"
                    disabled={isLoading}
                    autoComplete="name"
                />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="font-medium">
                    {t("emailAddress")}
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    required
                    className="h-12"
                    disabled={isLoading}
                    autoComplete="email"
                />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="font-medium">
                    {t("password")}
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("passwordPlaceholder")}
                        required
                        className="h-12 pr-10"
                        disabled={isLoading}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={isLoading}
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
                className="h-12 mt-2 w-full text-base font-bold shadow-lg shadow-primary/20"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("creatingAccount")}
                    </>
                ) : (
                    t("createAccount")
                )}
            </Button>
        </form>
    );
}
