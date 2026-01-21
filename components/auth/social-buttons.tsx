"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SocialButtonsProps {
    isLoading?: boolean;
}

export function SocialButtons({ isLoading: externalLoading }: SocialButtonsProps) {
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    const handleSocialLogin = (provider: string) => {
        setLoadingProvider(provider);
        signIn(provider, { callbackUrl: "/" });
    };

    const isDisabled = externalLoading || loadingProvider !== null;

    return (
        <div className="grid grid-cols-2 gap-4">
            <Button
                variant="outline"
                className="h-12 w-full"
                onClick={() => handleSocialLogin("google")}
                disabled={isDisabled}
            >
                {loadingProvider === "google" ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <span className="mr-2 h-5 w-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.267 2.08-2.08 2.76-5.174 2.76-7.667 0-.76-.067-1.48-.187-2.146h-10.61v.001z" fill="currentColor" />
                        </svg>
                    </span>
                )}
                Google
            </Button>
            <Button
                variant="outline"
                className="h-12 w-full"
                onClick={() => handleSocialLogin("auth0")}
                disabled={isDisabled}
            >
                {loadingProvider === "auth0" ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <span className="mr-2 h-5 w-5 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
                            <path d="M20.211 4.29a33.502 33.502 0 00-4.04-1.29l-.26 1.34c1.383.336 2.673.81 3.864 1.407a16.598 16.598 0 00-3.35-1.928c-1.189-.525-2.458-.934-3.784-1.218l.261 1.472a31.321 31.321 0 00-3.411-.314l-.067 1.332a26.88 26.88 0 00-1.898.314l-.26-1.34c-1.327.284-2.595.693-3.784 1.218a16.598 16.598 0 00-3.35 1.928c1.19-.597 2.481-1.071 3.864-1.407L3.79 3a33.502 33.502 0 00-4.04 1.29L0 4.394l.805 15.312L12 24l11.195-4.294L24 4.394l-.211-.104l-3.578 0" />
                        </svg>
                    </span>
                )}
                Auth0
            </Button>
        </div>
    );
}

