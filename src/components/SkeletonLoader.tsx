'use client';

export function QueueCardSkeleton() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md animate-pulse">
      <div className="mb-3 h-4 w-20 rounded bg-gray-300" />
      <div className="h-16 w-full rounded bg-gray-300" />
    </div>
  );
}

export function TampilanAntrianSkeleton() {
  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2">
      <QueueCardSkeleton />
      <QueueCardSkeleton />
    </div>
  );
}

export function CatCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="space-y-4">
        <div className="h-6 w-40 rounded bg-gray-300" />
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="h-5 w-5 rounded bg-gray-300" />
            <div className="h-4 w-32 rounded bg-gray-300" />
          </div>
          <div className="flex gap-3">
            <div className="h-5 w-5 rounded bg-gray-300" />
            <div className="h-4 w-24 rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CatCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AnalyticsCardSkeleton() {
  return (
    <div className="rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="space-y-4">
        <div className="h-4 w-24 rounded bg-gray-300" />
        <div className="h-10 w-20 rounded bg-gray-300" />
        <div className="h-3 w-32 rounded bg-gray-300" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm animate-pulse space-y-4">
      <div className="h-6 w-48 rounded bg-gray-300" />
      <div className="flex items-end justify-between gap-2 py-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded bg-gray-300"
            style={{ height: `${Math.random() * 150 + 50}px` }}
          />
        ))}
      </div>
    </div>
  );
}
