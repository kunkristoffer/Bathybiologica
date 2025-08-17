import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/base/header";
import { Footer } from "@/components/layout/base/footer";
import "@/assets/styles/globals.css";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { Theme } from "@/actions/changeTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bathybiologica",
  description: "wip",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get user prefered language
  const locale = await getLocale();

  // Check if user has changed prefered color theme
  const theme = ((await cookies()).get("theme")?.value as Theme) || undefined;
  const themeAttrs = theme ? { "data-theme": theme } : {};

  return (
    <html lang={locale} {...themeAttrs}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
