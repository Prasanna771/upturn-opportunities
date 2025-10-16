"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// CHANGED: Updated the import path for the types
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}