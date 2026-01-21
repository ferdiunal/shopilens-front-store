"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface SocialButtonsProps {
    isLoading?: boolean;
}

export function SocialButtons({ isLoading }: SocialButtonsProps) {
    const handleSocialLogin = (provider: string) => {
        signIn(provider, { callbackUrl: "/" });
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <Button
                variant="outline"
                className="h-12 w-full"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
            >
                <svg className="mr-2 h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.267 2.08-2.08 2.76-5.174 2.76-7.667 0-.76-.067-1.48-.187-2.146h-10.61v.001z"
                        fill="currentColor"
                    />
                </svg>
                Google
            </Button>
            <Button
                variant="outline"
                className="h-12 w-full"
                onClick={() => handleSocialLogin("apple")}
                disabled={isLoading}
            >
                <svg className="mr-2 h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.14.47-2.1.6-3.08-.35-1.54-1.54-2.1-4.14-.54-6.4 1.23-1.77 3.32-2.31 4.57-1.8 1.16.48 1.91.48 3.03 0 1.29-.53 3.09.07 4.1 1.6-3.82 2.08-3.15 7.15 1.14 8.7-.35 1.12-1.07 2.33-2.9 4.1zM12.03 7.25c-.25-2.19 1.62-4.04 3.7-4.25.32 2.39-2.25 4.34-3.7 4.25z"
                        fill="currentColor"
                    />
                </svg>
                Apple
            </Button>
        </div>
    );
}
