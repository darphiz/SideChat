import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from "react-dom/client";
import SettingsPage  from "./SettingsPage";
import "../style.css";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(
    <ChakraProvider>
        <SettingsPage />
    </ChakraProvider>
  );
}

init();
