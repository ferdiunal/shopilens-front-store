"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
    User,
    Package,
    MapPin,
    CreditCard,
    Settings,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
}

export function ProfileSidebar() {
    const t = useTranslations("profile.sidebar");
    const pathname = usePathname();
    const { data: session } = useSession();

    const navItems: NavItem[] = [
        { icon: User, label: t("profile"), href: "/profile" },
        { icon: Package, label: t("orders"), href: "/profile/orders" },
        { icon: MapPin, label: t("addresses"), href: "/profile/addresses" },
        { icon: CreditCard, label: t("paymentMethods"), href: "/profile/payment-methods" },
        { icon: Settings, label: t("settings"), href: "/profile/settings" },
    ];

    const isActive = (href: string) => {
        const lang = pathname.split("/")[1];
        return pathname === `/${lang}${href}`;
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <aside className="w-full border-b border-border bg-card px-4 py-6 md:w-72 md:border-b-0 md:border-r md:min-h-[calc(100vh-64px)]">
            {/* User Info */}
            <div className="mb-8 flex flex-col items-center gap-3 px-2 text-center">
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-card">
                    {session?.user?.image ? (
                        <img
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-200 dark:bg-slate-700">
                            <User className="h-10 w-10 text-slate-400" />
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {session?.user?.name || "User"}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {t("premiumMember")}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    const lang = pathname.split("/")[1];

                    return (
                        <Link
                            key={item.href}
                            href={`/${lang}${item.href}`}
                            className={cn(
                                "group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                active
                                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Sign Out Button */}
            <div className="mt-8 border-t border-border pt-6">
                <Button
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={handleSignOut}
                >
                    <LogOut className="h-4 w-4" />
                    {t("signOut")}
                </Button>
            </div>
        </aside>
    );
}
