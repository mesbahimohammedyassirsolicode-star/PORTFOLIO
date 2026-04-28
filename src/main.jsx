import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AnimationBudgetProvider } from "./hooks/useAnimationBudget";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnimationBudgetProvider>
      <App />
    </AnimationBudgetProvider>
  </React.StrictMode>
);
