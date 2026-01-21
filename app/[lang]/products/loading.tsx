import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
    return (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10">
            {/* Breadcrumbs Skeleton */}
            <div className="flex items-center gap-2 mb-6">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
            </div>

            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Skeleton */}
                <aside className="w-full lg:w-64 flex-shrink-0 space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                </aside>

                {/* Grid Skeleton */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <Skeleton className="aspect-square w-full rounded-2xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-6 w-1/3 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
