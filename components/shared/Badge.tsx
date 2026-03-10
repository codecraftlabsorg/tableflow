import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
| "veg"
| "non-veg"
| "popular"
| "vegan"
| "quick"
| "spicy"
| "pending"
| "preparing"
| "ready"
| "served"
| "teal"
| "gold"
| "accent"
| "purple"
| "muted"
| "urgency-normal"
| "urgency-warning"
| "urgency-critical";

interface BadgeProps extends
HTMLAttributes<HTMLSpanElement>{
    variant?:BadgeVariant;
    dot?: boolean; // Show a colored dot indicator
    pulse?: boolean; //Animate the dot (for critical urgency)
    }

// ─── Variant Styles

const variantStyles:
Record<BadgeVariant, { badge: string; dot: string }>={
    veg:{
        badge: "bg-teal/10 text-teal border-teal/20",
        dot: "bg-teal",
        },
    non-veg:{
        badge: "bg-accent/10 text-accent border-accent/20",
        dot: "bg-accent",
    },
    popular:{
        badge: "bg-gold/10 text-gold border-gold/20",
        dot: "bg-gold",
    },
    vegan: {
        badge: "bg-teal/10 text-teal border-teal/20",
        dot: "bg-teal",
    },
    quick: {
        badge: "bg-purple/10 text-purple border-purple/20",
        dot: "bg-purple",
    },
    spicy:{
        badge: "bf-accent/10 text-accent border-accent/20",
        dot: "bg-accent",
    },
//   order status
     pending: {
        badge: "bg-gold/10 text-gold border-gold/20",
        dot: "bg-gold",
      },
      preparing: {
        badge: "bg-purple/10 text-purple border-purple/20",
        dot: "bg-purple",
      },
      ready: {
        badge: "bg-teal/10 text-teal border-teal/20",
        dot: "bg-teal",
      },
      served: {
        badge: "bg-text-mid/10 text-text-mid border-text-mid/20",
        dot: "bg-text-mid",
      },
  //Generic
      teal: {
        badge: "bg-teal/10 text-teal border-teal/20",
        dot: "bg-teal",
      },
      gold: {
        badge: "bg-gold/10 text-gold border-gold/20",
        dot: "bg-gold",
      },
      accent: {
        badge: "bg-accent/10 text-accent border-accent/20",
        dot: "bg-accent",
      },
      purple: {
        badge: "bg-purple/10 text-purple border-purple/20",
        dot: "bg-purple",
      },
      muted: {
        badge: "bg-text-muted/10 text-text-muted border-text-muted/20",
        dot: "bg-text-muted",
      },
  // KDS Urgency
        "urgency-normal": {
            badge: "bg-teal/10 text-teal border-teal/30",
            dot: "bg-teal",
          },
          "urgency-warning": {
            badge: "bg-gold/10 text-gold border-gold/30",
            dot: "bg-gold",
          },
          "urgency-critical": {
            badge: "bg-accent/10 text-accent border-accent/30",
            dot: "bg-accent",
          },
      };

  // Component

  const Badge = ({
    variant = "muted",
    dot = false,
    pulse = false,
    children,
    className,
    ...props
  }: BadgeProps) => {
    const styles = variantStyles[variant];

    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5",
          "rounded-badge border px-[10px] py-[3px]",
          "font-body font-bold text-label uppercase tracking-wide",
          "whitespace-nowrap select-none",
          styles.badge,
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-[7px] h-[7px] rounded-full shrink-0",
              styles.dot,
              pulse && "animate-pulse"
            )}
          />
        )}
        {children}
      </span>
    );
  };

  export default Badge;

  /*
  USAGE EXAMPLES:
  ───────────────────────────────────────────────────────────────────

  import Badge from "@/components/shared/Badge";

  // Food tags
  <Badge variant="veg" dot>Veg</Badge>
  <Badge variant="non-veg" dot>Non-Veg</Badge>
  <Badge variant="popular">🔥 Popular</Badge>
  <Badge variant="spicy">🌶 Spicy</Badge>
  <Badge variant="vegan">🌱 Vegan</Badge>
  <Badge variant="quick">⚡ Quick</Badge>

  // Order status
  <Badge variant="pending" dot>Pending</Badge>
  <Badge variant="preparing" dot>Preparing</Badge>
  <Badge variant="ready" dot>Ready</Badge>
  <Badge variant="served" dot>Served</Badge>

  // KDS Urgency
  <Badge variant="urgency-normal" dot>On Time</Badge>
  <Badge variant="urgency-warning" dot>5+ min</Badge>
  <Badge variant="urgency-critical" dot pulse>10+ min</Badge>