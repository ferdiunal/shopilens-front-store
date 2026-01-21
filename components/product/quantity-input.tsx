"use client";

/**
 * Quantity Input Component
 */

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantityInputProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    className?: string;
}

export function QuantityInput({
    value,
    onChange,
    min = 1,
    max = 99,
    className,
}: QuantityInputProps) {
    const decrease = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    const increase = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    return (
        <div
            className={cn(
                "flex items-center rounded-lg border border-input h-12 w-32",
                className
            )}
        >
            <Button
                variant="ghost"
                size="icon"
                onClick={decrease}
                disabled={value <= min}
                className="h-full rounded-r-none"
            >
                <Minus className="size-4" />
            </Button>
            <div className="flex-1 text-center font-medium">{value}</div>
            <Button
                variant="ghost"
                size="icon"
                onClick={increase}
                disabled={value >= max}
                className="h-full rounded-l-none"
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
}
