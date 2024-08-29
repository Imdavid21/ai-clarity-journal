import React from "react";
import "@/styles/global.css";
import { AuthProvider } from "@/AuthContext";
import { JournalProvider } from "@/JournalContext";

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
