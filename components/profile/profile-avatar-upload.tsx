"use client";

import { useTranslations } from "next-intl";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileAvatarUploadProps {
    imageUrl?: string | null;
    onUpload?: () => void;
    onDelete?: () => void;
}

export function ProfileAvatarUpload({
    imageUrl,
    onUpload,
    onDelete,
}: ProfileAvatarUploadProps) {
    const t = useTranslations("profile.avatar");

    return (
        <div className="mb-8 flex items-center gap-6">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-muted">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Upload className="h-8 w-8" />
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-semibold text-foreground">
                    {t("title")}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                    {t("description")}
                </p>
                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onUpload}
                        className="bg-foreground text-background hover:bg-foreground/80"
                    >
                        {t("uploadNew")}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onDelete}
                    >
                        {t("delete")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
