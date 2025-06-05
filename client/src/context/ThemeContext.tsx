import React, { useContext, useEffect } from "react";
import usePersistentState from "../hooks/usePersistentState";

const THEME_STORAGE_KEY = "theme";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType | null>(null);

const initialTheme: ThemeType =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export function ThemeProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const [theme, setTheme] = usePersistentState<ThemeType>(
    initialTheme,
    THEME_STORAGE_KEY
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme can only be used within the ThemeProvider");
  }
  return context;
};
