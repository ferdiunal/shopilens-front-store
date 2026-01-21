/**
 * Breadcrumb Component
 */

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn("flex flex-wrap items-center gap-2 text-sm", className)}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && (
                        <ChevronRight className="size-4 text-muted-foreground" />
                    )}
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
