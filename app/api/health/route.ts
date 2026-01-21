/**
 * Health Check API Route
 * Docker ve load balancer için
 */

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        },
        { status: 200 }
    );
}
