
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LoadingSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center min-h-[60vh] gap-4", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-12 w-60 bg-gray-200" />
        <Skeleton className="h-4 w-40 bg-gray-200" />
      </div>
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Skeleton className="h-8 w-full bg-gray-200" />
        <Skeleton className="h-8 w-full bg-gray-200" />
        <Skeleton className="h-8 w-full bg-gray-200" />
      </div>
    </div>
  );
}
