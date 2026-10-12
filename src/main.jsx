import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { AnimationBudgetProvider } from "./hooks/useAnimationBudget";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <AnimationBudgetProvider>
        <App />
      </AnimationBudgetProvider>
    </MotionConfig>
  </React.StrictMode>
);
