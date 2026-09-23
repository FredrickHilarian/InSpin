  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { Analytics } from "@vercel/analytics/react";
  import { SurveyDataProvider } from "./app/context/SurveyDataContext";

  createRoot(document.getElementById("root")!).render(
    <SurveyDataProvider>
      <App />
      <Analytics />
    </SurveyDataProvider>
  );