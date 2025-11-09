import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brain Flip",
  description: "Have fun with your friends with an exciting memory game.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
