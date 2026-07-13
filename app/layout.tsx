import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc Joshua Catalo | Backend Developer",
  description:
    "Editorial portfolio for Marc Joshua Catalo, a backend developer building systems across healthcare, agriculture, fitness, and job platform products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
