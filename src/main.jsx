import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./App.jsx";
import { reduxStore } from "./store/store";
import LocalizationWrapper from "./LocalizationWrapper";
import { SocketProvider } from "@components/socket/SocketProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <LocalizationWrapper>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </LocalizationWrapper>
    </Provider>
  </StrictMode>
);
