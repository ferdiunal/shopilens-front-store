"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
    children: React.ReactNode;
    quote?: string;
    author?: string;
    backgroundImage?: string;
}

export function AuthLayout({
    children,
    quote = '"Style is a way to say who you are without having to speak."',
    author = "Rachel Zoe",
    backgroundImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCNrYRoHW1ivHjYf6psdBkZq5KuyLCnhBIGAtPt0PbgdoDG1PNh05ZDnYJpTWBvTcaP3ChBcHd7U4OcPbBdpTjhhBqJO_zD_RUwPVWHBQga3FJASI-8Sc2v8MPdjl7P_tG_N5_TcVpi4IJp7e-tquHTzmskw5h7YiRO3M5R9jPqZ2gLjHnZvvEkmKy-Vzst6vMT0HS7uWl6-32Ha5zaJVM3T9-HkBot8tiDYDnv_Vo16jHOsa8E9dC5xiSsX3vHwz4XrYMdFAWth2_4",
}: AuthLayoutProps) {
    return (
        <div className="flex h-screen w-full flex-row overflow-hidden bg-background">
            {/* Left Side: Image (Hidden on mobile, visible on lg screens) */}
            <div className="hidden lg:flex w-1/2 relative bg-gray-900 h-full">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
                    style={{ backgroundImage: `url('${backgroundImage}')` }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="relative z-10 flex flex-col justify-end p-12 w-full">
                    <div className="flex items-center gap-3 text-white mb-6">
                        <div className="size-10 flex items-center justify-center bg-primary rounded-lg text-white">
                            <span className="text-2xl font-bold">S</span>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">ShopiLens</h2>
                    </div>

                    <blockquote className="text-2xl font-medium text-white leading-relaxed max-w-lg mb-4">
                        {quote}
                    </blockquote>
                    <p className="text-gray-300 font-medium">{author}</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-24 h-full overflow-y-auto bg-background">
                <div className="w-full max-w-[440px] flex flex-col gap-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
