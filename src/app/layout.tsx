import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food Share - Rescuing Food, Feeding Communities",
  description:
    "Food Share rescues and distributes more than 2,000,000 lbs. of food every week in partnership with grocers, wholesalers, and farmers.",
  keywords:
    "food rescue, food waste, hunger relief, food distribution, surplus food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
