import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import App from "./App.tsx";

import "./styles/index.css";
import "./styles/app.css";
import "./styles/text.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <main>
          <App />
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  </StrictMode>
);
