"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock success/error
        // For now, we'll just show an error as API is not ready
        setError("Registration is momentarily unavailable. Please try again later.");
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
                    Create Account
                </h1>
                <p className="mt-2 text-base text-muted-foreground">
                    Sign up to get started and unlock exclusive features.
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
                    Full Name
                </Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="h-12"
                    disabled={isLoading}
                    autoComplete="name"
                />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="font-medium">
                    Email Address
                </Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="h-12"
                    disabled={isLoading}
                    autoComplete="email"
                />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="font-medium">
                    Password
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
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
                        Creating Account...
                    </>
                ) : (
                    "Create Account"
                )}
            </Button>
        </form>
    );
}
