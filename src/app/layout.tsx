import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils/classname";
import { gabarito } from "@/fonts";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Brain Flip",
  description: "Have fun with your friends in this exciting memory game.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={cn("antialiased", gabarito.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
