"use client";
import { useState, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  active?: boolean;
  error?: string;
  rightIcon?: ReactNode;
}

export default function Input({
  label,
  active = false,
  error,
  rightIcon,
  className = "",
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const isActive = active || focused;

  return (
    <div className={className}>
      {label && (
        <label
          className={`font-body font-extrabold text-[10px] uppercase ml-2 mb-1 block ${
            error ? "text-error" : isActive ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          {label}
        </label>
      )}
      <div
        className={`bg-black border-2 rounded-[48px] h-14 flex items-center justify-between px-[18px] transition-all ${
          error
            ? "border-error shadow-[0_0_15px_rgba(255,115,81,0.15)]"
            : isActive
            ? "border-primary shadow-[0_0_15px_rgba(226,255,58,0.15)]"
            : "border-outline-variant/30"
        }`}
      >
        <input
          {...props}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="bg-transparent w-full font-body text-[16px] text-white placeholder:text-[#6b7280] outline-none"
        />
        {rightIcon && <div className="ml-3 shrink-0">{rightIcon}</div>}
      </div>
      {error && (
        <p className="font-body font-extrabold text-[10px] tracking-[1px] uppercase text-error mt-1 ml-2">
          {error}
        </p>
      )}
    </div>
  );
}
