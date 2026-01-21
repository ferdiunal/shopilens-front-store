/**
 * ProductPrice Component
 * Fiyat, indirim ve orijinal fiyat gösterimi
 */

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductPriceProps {
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    className?: string;
}

export function ProductPrice({
    price,
    originalPrice,
    discountPercent,
    className,
}: ProductPriceProps) {
    const hasDiscount = originalPrice && originalPrice > price;

    return (
        <div className={cn("flex items-center gap-3 flex-wrap", className)}>
            <span className="text-2xl font-bold text-foreground">
                {formatPrice(price)}
            </span>
            {hasDiscount && (
                <>
                    <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(originalPrice)}
                    </span>
                    {discountPercent && (
                        <Badge variant="success">{discountPercent}% OFF</Badge>
                    )}
                </>
            )}
        </div>
    );
}
