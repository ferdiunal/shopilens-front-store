"use client";

/**
 * ColorSelector Component
 * Yuvarlak renk seçici butonları
 */

import { cn } from "@/lib/utils";

export interface ColorOption {
    id: string;
    name: string;
    hex: string;
}

interface ColorSelectorProps {
    colors: ColorOption[];
    selectedColor: string;
    onColorChange: (colorId: string) => void;
    className?: string;
}

export function ColorSelector({
    colors,
    selectedColor,
    onColorChange,
    className,
}: ColorSelectorProps) {
    const selected = colors.find((c) => c.id === selectedColor);

    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex justify-between">
                <span className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    Color
                </span>
                {selected && (
                    <span className="text-sm text-muted-foreground">
                        {selected.name}
                    </span>
                )}
            </div>
            <div className="flex gap-3">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => onColorChange(color.id)}
                        aria-label={`Select ${color.name}`}
                        className={cn(
                            "size-10 rounded-full border transition-all",
                            "ring-offset-2 ring-offset-background",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            selectedColor === color.id
                                ? "ring-2 ring-primary border-transparent"
                                : "border-border hover:ring-2 hover:ring-muted-foreground/30"
                        )}
                        style={{ backgroundColor: color.hex }}
                    />
                ))}
            </div>
        </div>
    );
}
