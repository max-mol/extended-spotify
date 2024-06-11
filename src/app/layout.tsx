"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import MuiProvider from "@/components/ui/MuiProvider";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiProvider>{children}</MuiProvider>
      </body>
    </html>
  );
}
