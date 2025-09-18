import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GVI Clone - NextJS",
  description: "GVI clone that uses NextJS",
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
