import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PomoPeer",
  description: "let's get productive together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system">
        <body
          className={`${outfit.className} flex flex-col h-[100svh] w-full overflow-y-auto bg-background`}
        >
          <Nav />
          <main className="pt-16">{children}</main>
        </body>
      </ThemeProvider>
    </html>
  );
}
