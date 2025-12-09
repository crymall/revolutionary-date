import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </StrictMode>
);
