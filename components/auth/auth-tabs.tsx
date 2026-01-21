"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { cn } from "@/lib/utils";

export function AuthTabs() {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get("view") === "register" ? "register" : "login";
    const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);

    return (
        <div className="w-full">
            {/* Tabs Header */}
            <div className="flex border-b border-border gap-8 mb-8">
                <button
                    onClick={() => setActiveTab("login")}
                    className={cn(
                        "flex flex-col items-center justify-center pb-3 px-2 outline-none focus:outline-none transition-colors border-b-[3px]",
                        activeTab === "login"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <span className="text-sm font-bold leading-normal tracking-[0.015em]">
                        Sign In
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab("register")}
                    className={cn(
                        "flex flex-col items-center justify-center pb-3 px-2 outline-none focus:outline-none transition-colors border-b-[3px]",
                        activeTab === "register"
                            ? "border-primary text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <span className="text-sm font-bold leading-normal tracking-[0.015em]">
                        Create Account
                    </span>
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
    );
}
