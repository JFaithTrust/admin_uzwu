import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | UZWorks Admin Panel",
    default: "UZWorks Admin Panel",
  },
  description: "Admin panel for Uzworks.uz website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      <Toaster richColors />
      </body>
    </html>
  );
}
