import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themes/themeProvider";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import WIPinMobileView from "@/components/home/mobileViewrning";

export const metadata: Metadata = {
  title: "SafeGuard",
  description: "SafeGuard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <WIPinMobileView />
          {children}
          <Toaster
            position="top-right"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
