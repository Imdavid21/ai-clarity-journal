import React from "react";
import "@/app/globals.css";
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
