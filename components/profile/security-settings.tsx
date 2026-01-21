"use client";

import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SecuritySettingsProps {
    lastPasswordChange?: string;
}

export function SecuritySettings({
    lastPasswordChange = "3 months",
}: SecuritySettingsProps) {
    const t = useTranslations("profile.security");

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-base font-semibold text-foreground">
                        {t("title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {t("description")}
                    </p>
                </div>
                <Button variant="link" className="text-primary hover:text-blue-400">
                    {t("updatePassword")}
                </Button>
            </div>

            <div className="rounded-lg border border-border bg-muted p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                            <Lock className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">
                                {t("password")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {t("lastChanged", { time: lastPasswordChange })}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(6)].map((_, i) => (
                            <span
                                key={i}
                                className="h-2 w-2 rounded-full bg-muted-foreground"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
