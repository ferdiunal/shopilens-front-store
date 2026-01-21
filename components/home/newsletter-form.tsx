"use client";

/**
 * Newsletter Form Component
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/types";

interface NewsletterFormProps {
    dict: Dictionary;
}

export function NewsletterForm({ dict }: NewsletterFormProps) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        setEmail("");
        alert("Subscribed successfully!");
    };

    return (
        <div className="w-full bg-card border-y border-border py-16">
            <div className="mx-auto max-w-lg px-4 text-center">
                <h3 className="text-2xl font-bold">{dict.common.newsletter}</h3>
                <p className="mt-2 text-muted-foreground">
                    {dict.common.newsletterDescription}
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2 mt-6">
                    <Input
                        type="email"
                        placeholder={dict.common.enterEmail}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "..." : dict.common.subscribe}
                    </Button>
                </form>
            </div>
        </div>
    );
}
