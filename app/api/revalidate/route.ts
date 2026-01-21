import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

/**
 * On-Demand Revalidation API
 * 
 * Örnek Kullanım:
 * /api/revalidate?tag=products&secret=YOUR_SECRET
 * /api/revalidate?path=/en/products/1&secret=YOUR_SECRET
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tag = searchParams.get("tag");
    const path = searchParams.get("path");
    const secret = searchParams.get("secret");

    // Basit bir güvenlik kontrolü
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    try {
        if (tag) {
            revalidateTag(tag, 'max');
            return NextResponse.json({ revalidated: true, now: Date.now(), tag });
        }

        if (path) {
            revalidatePath(path);
            return NextResponse.json({ revalidated: true, now: Date.now(), path });
        }

        return NextResponse.json(
            { message: "Missing tag or path" },
            { status: 400 }
        );
    } catch (err) {
        return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
    }
}
