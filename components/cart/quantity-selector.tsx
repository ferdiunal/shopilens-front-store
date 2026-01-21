"use client";

/**
 * Quantity Selector Component
 * Miktar +/- kontrolleri
 */

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    min?: number;
    max?: number;
    disabled?: boolean;
}

export function QuantitySelector({
    quantity,
    onIncrease,
    onDecrease,
    min = 1,
    max = 99,
    disabled = false,
}: QuantitySelectorProps) {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={onDecrease}
                disabled={disabled || quantity <= min}
                aria-label="Decrease quantity"
            >
                <Minus className="size-4" />
            </Button>

            <span className="w-8 text-center font-medium tabular-nums">
                {quantity}
            </span>

            <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={onIncrease}
                disabled={disabled || quantity >= max}
                aria-label="Increase quantity"
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
}
