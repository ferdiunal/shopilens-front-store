import { ProfileSidebar } from "@/components/profile";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-64px)] flex-col md:flex-row">
            <ProfileSidebar />
            <main className="flex-1 bg-muted px-6 py-8 lg:px-12">
                <div className="mx-auto max-w-4xl">{children}</div>
            </main>
        </div>
    );
}
