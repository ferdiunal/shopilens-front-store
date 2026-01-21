import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 py-8 lg:py-12">
            {/* Breadcrumbs Skeleton */}
            <div className="flex items-center gap-2 mb-6">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Left: Gallery Skeleton */}
                <div className="w-full lg:w-[60%]">
                    <Skeleton className="aspect-square w-full rounded-3xl" />
                    <div className="flex gap-4 mt-6">
                        <Skeleton className="h-20 w-20 rounded-xl" />
                        <Skeleton className="h-20 w-20 rounded-xl" />
                        <Skeleton className="h-20 w-20 rounded-xl" />
                    </div>
                </div>

                {/* Right: Info Skeleton */}
                <div className="w-full lg:w-[40%] flex flex-col gap-6">
                    <div className="space-y-4 pb-6 border-b">
                        <Skeleton className="h-10 w-3/4" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-4 w-4 rounded-full" />
                            ))}
                        </div>
                        <div className="space-y-2 pt-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Skeleton className="h-12 w-32 rounded-lg" />
                            <Skeleton className="h-12 flex-1 rounded-lg" />
                        </div>
                        <Skeleton className="h-14 w-full rounded-lg" />
                    </div>

                    <div className="space-y-3 mt-4">
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                        <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
