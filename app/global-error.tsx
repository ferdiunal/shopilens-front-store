"use client";

import { useEffect } from "react";
import { ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return (
        <html>
            <body className="bg-slate-950 text-white font-sans min-h-screen flex flex-col">
                <main className="flex-grow flex items-center justify-center p-6 relative">
                    {/* Background glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
                    </div>

                    <div className="flex flex-col items-center max-w-[600px] w-full z-10">
                        <div className="flex flex-col items-center gap-8 px-4 py-6">
                            <div className="flex items-center justify-center gap-2 text-blue-500 font-medium uppercase tracking-widest text-sm mb-2">
                                <AlertTriangle className="h-4 w-4" />
                                <span>SYSTEM MALFUNCTION</span>
                            </div>

                            <div className="text-center space-y-2">
                                <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tighter leading-none select-none">
                                    500
                                </h1>
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                    Internal Server Error
                                </h2>
                            </div>

                            <p className="text-slate-400 text-base font-normal leading-relaxed text-center max-w-[480px]">
                                Something went wrong on our end. We are working to fix it. Please try refreshing the page or come back later.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                                <button
                                    onClick={() => reset()}
                                    className="flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Refresh Page
                                </button>
                                <Link
                                    href="/"
                                    className="flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
