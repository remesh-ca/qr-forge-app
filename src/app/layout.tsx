import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "QR Forge | CSV to QR Code Generator",
  description: "Easily convert your CSV data into QR codes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <link rel="icon" href="public\qr-code-nav-title-icon.svg" type="image/svg+xml" />
       </head>
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Toaster />
        <footer className="py-4 text-center text-sm text-muted-foreground border-t mt-8">
          &copy; {new Date().getFullYear()} Remesh. All rights reserved.
        </footer>
      </body>
    </html>
  );
}