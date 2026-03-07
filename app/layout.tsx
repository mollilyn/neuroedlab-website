import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuroEd Lab",
  description: "NeuroEd Lab – personalised learning studio, Bangkok.",
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
