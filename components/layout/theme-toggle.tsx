"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cycle through: system -> light -> dark -> system
  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="h-9 w-9 rounded-xl hover:bg-accent/80 hover:text-builderz-green transition-all duration-200"
    >
      {theme === "system" ? (
        <Monitor className="h-[18px] w-[18px] transition-transform duration-300 hover:scale-110" />
      ) : resolvedTheme === "dark" ? (
        <Moon className="h-[18px] w-[18px] transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="h-[18px] w-[18px] transition-transform duration-300 hover:rotate-45" />
      )}
      <span className="sr-only">
        {theme === "system"
          ? "Using system theme"
          : resolvedTheme === "dark"
            ? "Switch to system theme"
            : "Switch to dark theme"}
      </span>
    </Button>
  );
}
