import { cn } from "@/lib/utils";

export function Logo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <span
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label="STANDARDS for International Trade"
    >
      <span
        className={cn(
          "flex items-end font-display text-2xl font-black tracking-tight",
          inverse ? "text-ivory" : "text-primary",
        )}
      >
        STANDARDS
        <span
          className={cn(
            "mb-[0.18em] ml-[0.12em] inline-block size-[0.32em]",
            inverse ? "bg-ivory" : "bg-navy",
          )}
        />
      </span>
      <span
        className={cn(
          "mt-1 font-display text-[0.55rem] font-semibold tracking-[0.32em]",
          inverse ? "text-ivory/80" : "text-navy",
        )}
      >
        FOR INTERNATIONAL TRADE
      </span>
    </span>
  );
}
