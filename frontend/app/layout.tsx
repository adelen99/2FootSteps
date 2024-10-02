import type { Metadata } from "next";
import Container from "@/globals/Container";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Online Shop",
  description: "A nifty store built with Next.js",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={"antialiased"}>
        <Providers>
          <Navbar />
          <Container>{children}</Container>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
