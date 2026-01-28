import type { Metadata } from "next";

import "./globals.css";



export const metadata: Metadata = {
  title: "The Psalmist International Church",
  description: "Kings, Priests, and Prophets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
