"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

//Types
type ModalSize="sm" | "md" | "lg" | "xl" | "full";
interface ModalProps{
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    size?: ModalSize;
    hideClose?: boolean;
    children: ReactNode;
    footer?: ReactNode; // Sticky footer slot(for action buttons)
    className?: string;
    }

// Size map

const sizeMap: Record<ModalSize, string> ={
    sm: "max-w sm",
    md: "max-w-[560px]",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
    };

// Component

const Modal = ({
  open,
  onClose,
  title,
  description,
  size = "md",
  hideClose = false,
  children,
  footer,
  className,
}: ModalProps) => {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    // Backdrop
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        "bg-brand-dark/70 backdrop-blur-sm",
        "animate-fade-in"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Panel */}
      <div
        className={cn(
          "relative w-full bg-white dark:bg-surface-dark",
          "rounded-modal shadow-modal",
          "flex flex-col max-h-[90vh]",
          "animate-slide-up",
          sizeMap[size],
          className
        )}
      >
        {/* Header */}
        {(title || !hideClose) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-border-gray dark:border-border-dark shrink-0">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="font-heading text-h3 text-text-dark dark:text-text-light font-bold"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-caption text-text-mid mt-1">{description}</p>
              )}
            </div>
            {!hideClose && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className={cn(
                  "p-1.5 rounded-lg shrink-0 mt-0.5",
                  "text-text-mid hover:text-text-dark hover:bg-surface-section",
                  "dark:hover:bg-border-dark dark:hover:text-text-light",
                  "transition-colors duration-150"
                )}
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/*  Scrollable body  */}
        <div className="flex-1 overflow-y-auto px-6 py-5 min-h-0">
          {children}
        </div>

        {/*  Sticky footer  */}
        {footer && (
          <div className="shrink-0 px-6 py-4 border-t border-border-gray dark:border-border-dark bg-surface dark:bg-surface-dark rounded-b-modal">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

/*
USAGE EXAMPLES:

import Modal from "@/components/shared/Modal";
import Button from "@/components/shared/Button";
import { useState } from "react";

// Basic usage
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Add New Dish"
  description="Fill in the details below to add a dish to the menu."
  footer={
    <div className="flex justify-end gap-3">
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary">Add Dish</Button>
    </div>
  }
>
  <p>Form fields go here</p>
</Modal>

// Trigger
<Button onClick={() => setOpen(true)}>Open Modal</Button>

// Sizes
<Modal size="sm" ...>  // Confirm dialogs
<Modal size="md" ...>  // Default forms (560px)
<Modal size="lg" ...>  // Complex forms
<Modal size="xl" ...>  // Data-heavy modals

*/