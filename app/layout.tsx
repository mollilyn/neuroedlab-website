import type { Metadata } from "next";
import {
  Roboto_Slab,
  Courgette,
  Sriracha,
  Mali,
} from "next/font/google";
import { LanguageProvider } from "@/src/context/LanguageContext";
import GoogleAnalytics from "@/src/components/GoogleAnalytics";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-headline-en",
});

const maliBody = Mali({
  weight: ["400", "500", "600"],
  subsets: ["latin", "thai"],
  display: "swap",
  variable: "--font-body-en",
});

const courgette = Courgette({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

const sriracha = Sriracha({
  weight: "400",
  subsets: ["thai"],
  display: "swap",
  variable: "--font-headline-th",
});

const mali = Mali({
  weight: ["400", "500", "600"],
  subsets: ["thai"],
  display: "swap",
  variable: "--font-body-th",
});

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
      <body
        className={`${robotoSlab.variable} ${maliBody.variable} ${courgette.variable} ${sriracha.variable} ${mali.variable}`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
