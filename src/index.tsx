import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
  // </React.StrictMode>
);
