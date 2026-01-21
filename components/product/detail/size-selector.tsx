"use client";

/**
 * SizeSelector Component
 * Grid layout beden seçici
 */

import { cn } from "@/lib/utils";

export interface SizeOption {
    id: string;
    label: string;
    inStock: boolean;
}

interface SizeSelectorProps {
    sizes: SizeOption[];
    selectedSize: string | null;
    onSizeChange: (sizeId: string) => void;
    onSizeGuideClick?: () => void;
    className?: string;
}

export function SizeSelector({
    sizes,
    selectedSize,
    onSizeChange,
    onSizeGuideClick,
    className,
}: SizeSelectorProps) {
    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    Size
                </span>
                {onSizeGuideClick && (
                    <button
                        onClick={onSizeGuideClick}
                        className="text-sm text-primary hover:text-primary/80 underline decoration-1 underline-offset-2 transition-colors"
                    >
                        Size Guide
                    </button>
                )}
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {sizes.map((size) => (
                    <button
                        key={size.id}
                        onClick={() => size.inStock && onSizeChange(size.id)}
                        disabled={!size.inStock}
                        className={cn(
                            "h-10 rounded-md border text-sm font-medium transition-all",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            size.inStock
                                ? selectedSize === size.id
                                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary font-bold"
                                    : "border-input bg-background text-foreground hover:border-primary hover:text-primary"
                                : "border-input bg-background text-muted-foreground cursor-not-allowed opacity-50 relative overflow-hidden"
                        )}
                    >
                        {size.label}
                        {!size.inStock && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-px bg-muted-foreground -rotate-45" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
