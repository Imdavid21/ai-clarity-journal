import React from "react";
import "@/styles/globals.css";
import { JournalProvider } from "@/contexts/JournalContext";

function MyApp({ Component, pageProps }) {
  return (
    <JournalProvider>
      <Component {...pageProps} />
    </JournalProvider>
  );
}

export default MyApp;
