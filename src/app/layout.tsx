import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/provider";
import { Toaster } from "@/components/ui/sonner";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/convex/provider";
import ReduxProvider from "@/redux/provider";
import { ProfileQuery } from "@/convex/query.config";
import { ConvexUserRaw, normalizeProfile } from "@/types/user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Ai - Sketch To Design",
  description: "Lumina Ai is a tool that allows you to convert your sketches to designs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rawProfile = await ProfileQuery()
  const profile = normalizeProfile(rawProfile._valueJSON as unknown as ConvexUserRaw)

  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en"
        suppressHydrationWarning
        className="bg-background"
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <ThemeProvider
              attribute={"class"}
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ReduxProvider preloadedState={{ profile }}>
                {children}
                <Toaster richColors duration={1500} position="top-center" />
              </ReduxProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
