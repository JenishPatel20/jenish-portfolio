"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, ChevronDown, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const modes = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Laptop },
] as const;

type ThemeMode = (typeof modes)[number]["value"];

interface ThemeModeToggleProps {
  className?: string;
  fullWidth?: boolean;
}

export function ThemeModeToggle({ className, fullWidth = false }: ThemeModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const rootRef = useRef<HTMLDivElement>(null);

  const currentTheme = mounted ? theme : "system";
  const currentMode = modes.find((mode) => mode.value === currentTheme) ?? modes[2];
  const CurrentIcon = currentMode.Icon;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const chooseMode = (value: ThemeMode) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-flex", fullWidth && "w-full", className)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme mode: ${currentMode.label}`}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-pg-border bg-pg-surface px-3 text-sm font-medium text-pg-text-2 shadow-sm transition-all duration-200 hover:border-pg-border-hover hover:bg-pg-surface-hover hover:text-pg-text-1",
          fullWidth && "h-11 w-full justify-between px-4"
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <CurrentIcon className="h-3.5 w-3.5 text-pg-accent" />
          {currentMode.label}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme options"
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-pg-border bg-pg-elevated p-1 shadow-lg backdrop-blur-xl",
            fullWidth && "left-0 right-auto w-full"
          )}
        >
          {modes.map((mode) => {
            const Icon = mode.Icon;
            const selected = currentMode.value === mode.value;

            return (
              <button
                key={mode.value}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => chooseMode(mode.value)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150",
                  selected
                    ? "bg-pg-accent/10 text-pg-accent"
                    : "text-pg-text-2 hover:bg-pg-surface-hover hover:text-pg-text-1"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="flex-1">{mode.label}</span>
                {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
