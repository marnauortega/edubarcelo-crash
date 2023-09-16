"use client";

import { ThemeProvider } from "next-themes";

const ClientThemeProvider = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ClientThemeProvider;
