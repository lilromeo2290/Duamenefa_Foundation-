import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://duamenefa.org"
  ),
  title: "Duamenefa Foundation - Let Us Co-Exist in Peace",
  description:
    "Duamenefa Foundation is a Ghana-based NGO promoting peace, reconciliation, child rights advocacy, and community transformation. Over 47,758 members, 610+ conflicts resolved.",
  keywords: [
    "Peace NGO Ghana",
    "Child Rights Advocacy Ghana",
    "Trokosi Liberation",
    "Peace and Reconciliation NGO",
    "Human Rights NGO Ghana",
    "Spiritual Conflict Resolution",
    "Duamenefa Foundation",
    "Community Transformation Ghana",
  ],
  authors: [{ name: "Duamenefa Foundation" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Duamenefa Foundation - Let Us Co-Exist in Peace",
    description:
      "Promoting peace, reconciliation, child rights advocacy, and community transformation across Ghana.",
    siteName: "Duamenefa Foundation",
    type: "website",
    images: ["/hero-peace.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duamenefa Foundation - Let Us Co-Exist in Peace",
    description:
      "Promoting peace, reconciliation, child rights advocacy, and community transformation across Ghana.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
