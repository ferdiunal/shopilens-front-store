/**
 * ProductRating Component
 * Yıldız rating ve review sayısı
 */

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductRatingProps {
    rate: number;
    count: number;
    className?: string;
}

export function ProductRating({ rate, count, className }: ProductRatingProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={cn(
                            "size-4",
                            star <= Math.round(rate)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                        )}
                    />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">
                ({count} reviews)
            </span>
        </div>
    );
}
