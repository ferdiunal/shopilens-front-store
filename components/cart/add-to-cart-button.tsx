"use client";

/**
 * Add to Cart Button Component
 */

import { ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export function AddToCartButton({
    onClick,
    isLoading = false,
    disabled = false,
    className,
    children = "Add to Cart",
}: AddToCartButtonProps) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled || isLoading}
            size="lg"
            className={cn("flex-1 h-12", className)}
        >
            {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
            ) : (
                <ShoppingBag className="size-5" />
            )}
            {children}
        </Button>
    );
}
