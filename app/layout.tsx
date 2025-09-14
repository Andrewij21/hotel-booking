import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "LuxeStay - Premium Hotel Booking",
  description: "Discover and book luxury accommodations worldwide",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <Suspense fallback={null}>
              {children}
              <Analytics />
            </Suspense>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
