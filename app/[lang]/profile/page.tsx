"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Save } from "lucide-react";
import {
    ProfileAvatarUpload,
    ProfileForm,
    SecuritySettings,
    DeleteAccountSection,
} from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    const t = useTranslations("profile");
    const { data: session } = useSession();

    const userData = {
        firstName: session?.user?.name?.split(" ")[0] || "",
        lastName: session?.user?.name?.split(" ").slice(1).join(" ") || "",
        email: session?.user?.email || "",
        phone: "",
        dateOfBirth: "",
    };

    const handleSave = () => {
        // TODO: Implement save functionality
        console.log("Saving profile...");
    };

    const handleCancel = () => {
        // TODO: Implement cancel functionality
        console.log("Cancelling...");
    };

    return (
        <>
            {/* Page Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        {t("title")}
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        {t("description")}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="link" className="text-primary hover:text-blue-400">
                        {t("viewPublicProfile")}
                    </Button>
                </div>
            </div>

            {/* Profile Form Card */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
                {/* Avatar Upload */}
                <ProfileAvatarUpload imageUrl={session?.user?.image} />

                <Separator className="mb-8" />

                {/* Profile Form */}
                <ProfileForm data={userData} />

                <Separator className="my-8" />

                {/* Security Settings */}
                <SecuritySettings lastPasswordChange="3 months" />

                {/* Action Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-end">
                    <Button
                        variant="ghost"
                        onClick={handleCancel}
                        className="text-muted-foreground hover:bg-muted"
                    >
                        {t("actions.cancel")}
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="gap-2 shadow-lg shadow-primary/30"
                    >
                        <Save className="h-4 w-4" />
                        {t("actions.saveChanges")}
                    </Button>
                </div>
            </div>

            {/* Delete Account Section */}
            <DeleteAccountSection />
        </>
    );
}
