"use client"

import * as React from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
  enableSystem?: boolean
  attribute?: string
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: string
  setTheme: (theme: string) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  enableSystem = true,
  attribute = "class",
  disableTransitionOnChange = false, // This prop is not fully implemented in this simplified version
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<string>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    try {
      return localStorage.getItem(storageKey) || defaultTheme
    } catch (e) {
      console.error("Error reading localStorage theme", e)
      return defaultTheme
    }
  })

  React.useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    let systemTheme = defaultTheme;
    if (enableSystem && theme === "system") {
       systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
    
    const effectiveTheme = theme === "system" ? systemTheme : theme;

    if (attribute === "class") {
      root.classList.add(effectiveTheme)
    } else {
      root.setAttribute(attribute, effectiveTheme);
    }
    
  }, [theme, enableSystem, defaultTheme, attribute])


  const handleSetTheme = (newTheme: string) => {
    try {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    } catch (e) {
      console.error("Error setting localStorage theme", e)
    }
  }
  
  React.useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      // Only update if current theme is 'system'
      if (theme === "system") {
         const root = window.document.documentElement
         root.classList.remove("light", "dark")
         root.classList.add(systemTheme)
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [enableSystem, theme]);


  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
