"use client";
import { ReactNode } from "react";

export default function BottomSheet({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div
        className="relative w-full bg-surface-container-high border-t border-primary/20 rounded-t-3xl p-8 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 rounded-full bg-outline-variant/30" />
        <h3 className="font-headline font-bold text-[20px] uppercase text-white w-full pt-4">
          {title}
        </h3>
        {description && (
          <p className="text-on-surface-variant text-[14px] leading-5 font-body w-full pb-4">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
