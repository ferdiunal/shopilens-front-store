"use client";

interface AuthHeaderProps {
    title: string;
    description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
    return (
        <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
                {title}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
                {description}
            </p>
        </div>
    );
}
