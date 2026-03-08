export default function SkeletonCard() {
  return (
    <div className="bg-cream rounded-[20px] p-9 animate-pulse">
      <div className="h-3 w-20 bg-cream-dark rounded mb-4" />
      <div className="h-5 w-full bg-cream-dark rounded mb-2" />
      <div className="h-5 w-3/4 bg-cream-dark rounded mb-4" />
      <div className="h-3 w-24 bg-cream-dark rounded" />
    </div>
  );
}

export function SkeletonLine({
  width = "100%",
  height = "16px",
  className = "",
}: {
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-cream-dark rounded ${className}`}
      style={{ width, height }}
    />
  );
}
