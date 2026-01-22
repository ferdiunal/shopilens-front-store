
import { NextResponse } from "next/server";
import { ProductService } from "@/lib/api/product.service";

export async function GET() {
    try {
        const products = await ProductService.getAll();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}
