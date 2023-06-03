import Header from "@/components/layouts/Header";
import { GlobalProvider } from "./GlobalProvider";
import "./globals.css";

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <GlobalProvider>
          <Header />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
