"use client";

import Image from "next/image";
import { type ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
    quote?: string;
    author?: string;
}

export function AuthLayout({
    children,
    quote = '"Style is a way to say who you are without having to speak."',
    author = "Rachel Zoe",
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-row">
            {/* Left Side: Image (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 relative bg-gray-900 h-screen">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2620&auto=format&fit=crop"
                        alt="Fashion background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                </div>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

                <div className="relative z-10 flex flex-col justify-end p-12 w-full h-full">
                    <div className="flex items-center gap-3 text-white mb-6">
                        <div className="size-10 flex items-center justify-center bg-primary rounded-lg text-white font-bold">
                            S
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">ShopILens</h2>
                    </div>
                    <blockquote className="text-2xl font-medium text-white leading-relaxed max-w-lg mb-4">
                        {quote}
                    </blockquote>
                    <p className="text-gray-300 font-medium">{author}</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24 h-screen overflow-y-auto bg-background">
                <div className="w-full max-w-[440px] flex flex-col gap-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
