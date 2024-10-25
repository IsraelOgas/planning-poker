// ThemeProviderComponent.tsx
import React, { useState, createContext, useContext, useEffect } from "react";
import { ThemeProvider, CssBaseline, useMediaQuery } from "@material-ui/core";
import { lightTheme, darkTheme } from "@/service";

type ThemeContextType = {
  currentTheme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeProviderComponent"
    );
  }
  return context;
};

export const ThemeProviderComponent: React.FC = ({ children }) => {
  const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const getInitialTheme = (): "light" | "dark" => {
    const savedTheme = localStorage.getItem("appTheme");
    if (savedTheme) {
      return savedTheme as "light" | "dark";
    }
    return systemPrefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  const toggleTheme = () => {
    console.log(theme);
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme }}>
      <div className={theme === "light" ? "LightTheme" : "DarkTheme"}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </div>
    </ThemeContext.Provider>
  );
};
