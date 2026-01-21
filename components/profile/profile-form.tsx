"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Calendar, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProfileFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
}

interface ProfileFormProps {
    data?: ProfileFormData;
    onSubmit?: (data: ProfileFormData) => void;
}

export function ProfileForm({ data, onSubmit }: ProfileFormProps) {
    const t = useTranslations("profile.form");

    const defaultData: ProfileFormData = {
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        email: data?.email || "",
        phone: data?.phone || "",
        dateOfBirth: data?.dateOfBirth || "",
    };

    return (
        <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <div className="relative">
                    <Input
                        id="firstName"
                        type="text"
                        defaultValue={defaultData.firstName}
                        className="pr-10"
                    />
                    <Pencil className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <div className="relative">
                    <Input
                        id="lastName"
                        type="text"
                        defaultValue={defaultData.lastName}
                        className="pr-10"
                    />
                    <Pencil className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 md:col-span-2">
                <Label htmlFor="email">{t("emailAddress")}</Label>
                <div className="flex gap-3">
                    <div className="relative grow">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            defaultValue={defaultData.email}
                            className="pl-10"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="secondary"
                        className="shrink-0 bg-muted text-muted-foreground hover:bg-accent"
                    >
                        {t("verify")}
                    </Button>
                </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="phone">{t("phoneNumber")}</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="phone"
                        type="tel"
                        defaultValue={defaultData.phone}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="dateOfBirth">{t("dateOfBirth")}</Label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="dateOfBirth"
                        type="text"
                        defaultValue={defaultData.dateOfBirth}
                        className="pl-10"
                    />
                </div>
            </div>
        </form>
    );
}
