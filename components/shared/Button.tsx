import {ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

// Types

type Variant = "primary" | "secondary" | "ghost" | "danger" | "teal" | "gold";
type Size ="sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: react.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    }

// Variant Styles

const variantStyles: Record<Variant,string> ={
    primary:
    "bg-accent text-white border-transparent hover:bg-accent-soft active: scale-95 shadow-sm",
    secondary:
    "bg-transparent text-accent border-2 border-accent hover:bg-accent/10 active:scale-95",
    ghost:
    "bg-transparent text-text-mid border-transparent hover:bg-surface-section active:scale-95",
    danger:
    "bg-accent text white border-transparent hover:opacity-90 active:scale-95 shadow-sm",
    teal:
    "bg-teal text-white border-transparent hover:bg-teal-light active:scale-95 shadow-sm",
    gold:
    "bg-gold text-brand-dark border-transparent hover:bg-teal-light active:scale-95 shadow-sm font-bold",
    };

const sizeStyles: Record<Size,sting>={
    sm: "h-8 px-3 text-xs gap-.5",
    md: "h-11 px-5 text-sm gap-2",
    lg: "h-13 px-7 text-base gap-2.5",
    };

// Component

const Button = forwardRef<HTMLButtonElement,ButtonProps>(
    (
      {
          variant ="primary",
          size ="md",
          loading =false,
          leftIcon,
          rightIcon,
          fullWidth =false,
          disabled,
          children,
          className,
          ...props
      },
      ref
      )=> {
       const isDisabled = disabled || loading;

          return(
              <button
              ref={ref}
              disabled={isDisabled}
              className={cn(
                  //Base
                   "inline-flex items-center justify-center rounded-btn font-body font-semibold",
                    "border transition-all duration-150 cursor-pointer select-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                    // Variant
                    variantStyles[variant],
                      // Size
                    sizeStyles[size],
                      // Full width
                    fullWidth && "w-full",
                        // Disabled
                    isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
                     className
                       )}
                   {...props}
                  >
                        {/* Left icon or spinner */}
                            {loading ? (
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              leftIcon && <span className="shrink-0">{leftIcon}</span>
                            )}

                            {children && <span>{children}</span>}

                            {rightIcon && !loading && (
                              <span className="shrink-0">{rightIcon}</span>
                            )}
                          </button>
                        );
                      }
                    );
                Button.displayName = "Button";

                export default Button;

                /*
                USAGE EXAMPLES:
                ───────────────────────────────────────────────────────────────────

                import Button from "@/components/shared/Button";

                // Primary CTA
                <Button variant="primary">Place Order</Button>

                // Secondary / outlined
                <Button variant="secondary">Continue Browsing</Button>

                // Ghost
                <Button variant="ghost">Cancel</Button>

                // Danger
                <Button variant="danger">Delete Dish</Button>

                // Teal (Kitchen confirm)
                <Button variant="teal">Mark Ready</Button>

                // Gold (Warnings / bump)
                <Button variant="gold">Bump Order</Button>

                // Loading state
                <Button loading>Sending...</Button>

                // With icons (install lucide-react)
                import { Plus } from "lucide-react";
                <Button leftIcon={<Plus size={16} />}>Add Dish</Button>

                // Full width
                <Button fullWidth>Submit</Button>

                // Size variants
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>   // default
                <Button size="lg">Large</Button>

                ───────────────────────────────────────────────────────────────────
                */