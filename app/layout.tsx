import type { Metadata } from "next";
import {
  Roboto_Slab,
  Noto_Sans,
  Courgette,
  Noto_Serif_Thai,
  Noto_Sans_Thai,
} from "next/font/google";
import { LanguageProvider } from "@/src/context/LanguageContext";
import GoogleAnalytics from "@/src/components/GoogleAnalytics";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-headline-en",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body-en",
});

const courgette = Courgette({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature",
});

const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  variable: "--font-headline-th",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
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
        className={`${robotoSlab.variable} ${notoSans.variable} ${courgette.variable} ${notoSerifThai.variable} ${notoSansThai.variable}`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
