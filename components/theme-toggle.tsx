"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4 text-[#101012] dark:text-white" />;
      case "dark":
        return <Moon className="h-4 w-4 text-[#101012] dark:text-white" />;
      case "system":
        return <Monitor className="h-4 w-4 text-[#101012] dark:text-white" />;
      default:
        return <Monitor className="h-4 w-4 text-[#101012] dark:text-white" />;
    }
  };

  const getTitle = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system mode";
      case "system":
        return "Switch to light mode";
      default:
        return "Toggle theme";
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-8 w-8 p-0 text-[#101012] dark:text-white border-[#101012]/30 dark:border-white/30 hover:bg-[#101012]/10 dark:hover:bg-white/10"
      title={getTitle()}
    >
      {getIcon()}
      <span className="sr-only">{getTitle()}</span>
    </Button>
  );
}