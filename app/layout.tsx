import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";

const mapleMono = localFont({
  src: [
    {
      path: "./fonts/MapleMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/MapleMono-Medium.ttf", 
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/MapleMono-SemiBold.ttf",
      weight: "600", 
      style: "normal",
    },
    {
      path: "./fonts/MapleMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-maple-mono",
  display: "swap",
  fallback: ["JetBrains Mono", "monospace"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "Personal bookmarks manager",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mapleMono.variable} ${jetbrainsMono.variable} font-mono antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
