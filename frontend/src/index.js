import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/Context";
import { AuthUserContextProvider } from "./context/UserContext";
import { SpinContextProvider } from "./context/spinnerContext";
import { UserContextProvider } from "./context/UserdetailsContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AuthUserContextProvider>
        <SpinContextProvider>
          <UserContextProvider>
          <App />
          </UserContextProvider>
        </SpinContextProvider>
      </AuthUserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
