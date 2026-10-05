import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marc Joshua Catalo | Mobile and Web Application Developer",
  description:
    "Editorial portfolio for Marc Joshua Catalo, a mobile and web application developer focused on backend systems across healthcare, agriculture, fitness, and job platform products.",
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
