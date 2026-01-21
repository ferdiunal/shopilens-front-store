"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface DeleteAccountSectionProps {
    onDelete?: () => void;
}

export function DeleteAccountSection({ onDelete }: DeleteAccountSectionProps) {
    const t = useTranslations("profile.deleteAccount");

    return (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/30 dark:bg-red-900/10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h3 className="text-base font-bold text-red-700 dark:text-red-400">
                        {t("title")}
                    </h3>
                    <p className="text-sm text-red-600/80 dark:text-red-400/70">
                        {t("description")}
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={onDelete}
                    className="whitespace-nowrap border-red-200 bg-white text-red-600 hover:bg-red-50 dark:border-red-800 dark:bg-transparent dark:text-red-400 dark:hover:bg-red-900/20"
                >
                    {t("button")}
                </Button>
            </div>
        </div>
    );
}
