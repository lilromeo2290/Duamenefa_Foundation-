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
      <head>
        {/* Detect platform-level "function is pending" errors and auto-retry */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var bodyText = document.body && document.body.innerText;
    if (bodyText && bodyText.indexOf('PreconditionFailed') !== -1 && bodyText.indexOf('pending state') !== -1) {
      var retryCount = parseInt(sessionStorage.getItem('__pf_retry') || '0', 10);
      if (retryCount < 5) {
        sessionStorage.setItem('__pf_retry', String(retryCount + 1));
        setTimeout(function(){ location.reload(); }, 2000 * (retryCount + 1));
      } else {
        sessionStorage.removeItem('__pf_retry');
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui;background:#0B3C5D;color:#fff;text-align:center;padding:2rem;"><div><div style="font-size:3rem;margin-bottom:1rem;">⏳</div><h1 style="font-size:1.5rem;margin-bottom:0.5rem;color:#D4AF37;">Server is Starting Up</h1><p style="color:rgba(255,255,255,0.7);margin-bottom:1.5rem;">The application is initializing. Please wait a moment and try again.</p><button onclick="sessionStorage.removeItem(\\'__pf_retry\\');location.reload();" style="background:#D4AF37;color:#0B3C5D;border:none;padding:0.75rem 2rem;border-radius:0.5rem;font-size:1rem;font-weight:600;cursor:pointer;">Try Again</button></div></div>';
      }
    } else {
      sessionStorage.removeItem('__pf_retry');
    }
  } catch(e) {}
})();
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
