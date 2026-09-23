import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { Analytics } from "@vercel/analytics/react";
import { SurveyDataProvider } from "./app/context/SurveyDataContext";
import { ThemeProvider } from "./app/context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <SurveyDataProvider>
      <App />
      <Analytics />
    </SurveyDataProvider>
  </ThemeProvider>
);