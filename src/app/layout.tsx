import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HeroesProvider } from "../context/HeroesContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel App",
  description: "Prueba Técnica Napptilus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeroesProvider>
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    </HeroesProvider>
  );
}
