import React from "react";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { JournalProvider } from "../context/JournalContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <JournalProvider>
        <Component {...pageProps} />
      </JournalProvider>
    </AuthProvider>
  );
}

export default MyApp;
