import React, { useEffect } from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
import { X } from "lucide-react";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

/**
 * Headless accessible Dialog primitive built on Base UI (@base-ui/react).
 * Meets WCAG 2.1 AA:
 * - Traps focus inside the modal
 * - Closes on 'Escape' key
 * - Locks body scroll
 * - Sets aria-modal="true" and connects title/description
 */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className = "",
  showCloseButton = true,
}: ModalProps) {
  // Global Escape key fallback listener for bulletproof keyboard accessibility
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        {/* Backdrop overlay with blur */}
        <BaseDialog.Backdrop
          className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/70 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => onOpenChange(false)}
        />

        {/* Modal Viewport & Popup Container */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <BaseDialog.Popup
            className={`relative w-full bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 outline-none transition-all duration-200 max-h-[90vh] overflow-y-auto ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-col gap-1">
                  {title && (
                    <BaseDialog.Title className="text-[18px] md:text-[20px] font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                      {title}
                    </BaseDialog.Title>
                  )}
                  {description && (
                    <BaseDialog.Description className="text-[12.5px] text-slate-500 dark:text-slate-400 font-medium">
                      {description}
                    </BaseDialog.Description>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close dialog"
                    className="size-8 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                  >
                    <X className="size-4.5" />
                  </button>
                )}
              </div>
            )}

            {/* Content body */}
            <div className="relative">{children}</div>
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}

export const DialogRoot = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogTitle = BaseDialog.Title;
export const DialogDescription = BaseDialog.Description;
export const DialogClose = BaseDialog.Close;
