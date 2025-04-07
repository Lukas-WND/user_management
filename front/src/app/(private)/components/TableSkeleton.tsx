import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton() {
  const rows = Array.from({ length: 10 });

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex justify-between">
        <Skeleton className="w-full max-w-md rounded-md border" />
        <Skeleton className="w-44 h-12 rounded-md border" />
      </div>

      {/* Tabela */}
      <div className="mt-2 rounded-md border">
        {/* Cabeçalho da tabela */}
        <Skeleton className="w-full h-12" />

        {/* Linhas de esqueleto */}
        {rows.map((_, index) => (
          <div
            key={index}
            className="w-full h-12 flex justify-between items-center px-6"
          >
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-56 h-8" />
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-20 h-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
