"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { ErrorPage } from "@/components/error";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    const params = useParams();
    const lang = (params?.lang as string) || "tr";

    return <ErrorPage type="500" lang={lang} />;
}
