import type { Metadata } from "next";
import "./globals.css";
import FloatingNavbar from "../components/FloatingNavbar";

export const metadata: Metadata = {
  title: "The Martyrs Church",
  description: "Kings, Priests, and Prophets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <FloatingNavbar />
      </body>
    </html>
  );
}
