import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// Types

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type SpinnerColor = "accent" | "teal" | "gold" | "white" | "muted";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;       // Accessible label (screen readers)
  overlay?: boolean;    // Full-container overlay with backdrop
}

// Size map

const sizeMap: Record<SpinnerSize, string> = {
  xs: "w-3 h-3 border-[1.5px]",
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-9 h-9 border-[3px]",
  xl: "w-14 h-14 border-4",
};

const colorMap: Record<SpinnerColor, string> = {
  accent: "border-accent/20 border-t-accent",
  teal: "border-teal/20 border-t-teal",
  gold: "border-gold/20 border-t-gold",
  white: "border-white/20 border-t-white",
  muted: "border-text-muted/20 border-t-text-muted",
};

// component

const Spinner = ({
  size = "md",
  color = "accent",
  label = "Loading…",
  overlay = false,
  className,
  ...props
}: SpinnerProps) => {
  const spinnerEl = (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex flex-col items-center justify-center gap-3", className)}
      {...props}
    >
      <span
        className={cn(
          "rounded-full animate-spin",
          sizeMap[size],
          colorMap[color]
        )}
      />
      {label && label !== "Loading…" && (
        <span className="text-caption text-text-muted font-mono">{label}</span>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );

  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/60 backdrop-blur-sm rounded-inherit z-50">
        {spinnerEl}
      </div>
    );
  }

  return spinnerEl;
};

// Page-level loading screen

export const PageLoader = ({ label = "Loading…" }: { label?: string }) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-surface-darker z-[999] gap-4">
    {/* TableFlow wordmark */}
    <span className="font-heading font-bold text-h2 text-white tracking-tight">
      Table<span className="text-accent">Flow</span>
    </span>
    <Spinner size="lg" color="accent" label={label} />
    <span className="text-caption text-text-muted font-mono">{label}</span>
  </div>
);

export default Spinner;

/*
USAGE EXAMPLES:
───────────────────────────────────────────────────────────────────

import Spinner, { PageLoader } from "@/components/shared/Spinner";

// Inline spinner (default)
<Spinner />

// Inside a button
<Spinner size="xs" color="white" />

// Kitchen dashboard — teal
<Spinner size="lg" color="teal" label="Loading orders..." />

// Overlay on a card (make parent relative)
<div className="relative">
  <SomeCard />
  <Spinner overlay color="teal" label="Updating..." />
</div>

// Full page loader
<PageLoader label="Connecting to kitchen..." />

───────────────────────────────────────────────────────────────────
*/
