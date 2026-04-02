import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DirectoryIQ",
  description: "Directory intelligence workspace for listings, authority, and optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
