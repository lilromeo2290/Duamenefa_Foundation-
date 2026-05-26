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
        {/*
          CRITICAL: This script runs BEFORE React hydrates.
          It detects serverless platform "function is pending state" errors
          that return raw JSON instead of HTML. When detected, it auto-retries
          with exponential backoff, then shows a branded loading page.

          The Service Worker (sw.js) handles this more robustly for returning
          visitors, but this script is the first line of defense.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    // Check if the page content is a raw platform error (not HTML)
    var raw = document.documentElement && document.documentElement.innerText ||
              document.body && document.body.innerText || '';

    if (raw.indexOf('PreconditionFailed') !== -1 &&
        (raw.indexOf('pending state') !== -1 || raw.indexOf('function is pending') !== -1)) {

      var retryKey = '__pf_retry';
      var retryCount = parseInt(sessionStorage.getItem(retryKey) || '0', 10);

      if (retryCount < 8) {
        sessionStorage.setItem(retryKey, String(retryCount + 1));
        var delay = Math.min(1500 * Math.pow(1.6, retryCount), 20000);
        setTimeout(function(){ location.reload(); }, delay);
      } else {
        sessionStorage.removeItem(retryKey);
        // Replace the raw JSON with a branded error page
        document.open();
        document.write(
          '<!DOCTYPE html><html><head><meta charset=\"utf-8\">' +
          '<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">' +
          '<title>Duamenefa Foundation - Starting Up</title>' +
          '<style>*{margin:0;padding:0;box-sizing:border-box}body{display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;background:#0B3C5D;color:#fff;text-align:center;padding:2rem}.container{max-width:500px}.icon{font-size:3rem;margin-bottom:1rem;animation:pulse 2s ease-in-out infinite}h1{font-size:1.5rem;margin-bottom:.5rem;color:#D4AF37}p{color:rgba(255,255,255,.7);margin-bottom:1.5rem;line-height:1.6}button{background:#D4AF37;color:#0B3C5D;border:none;padding:.75rem 2rem;border-radius:.5rem;font-size:1rem;font-weight:600;cursor:pointer}button:hover{background:#c9a22e}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}.logo{width:60px;height:60px;border-radius:50%;margin:0 auto 1.5rem;object-fit:cover}</style>' +
          '</head><body><div class=\"container\">' +
          '<img src=\"/logo.jpg\" alt=\"Duamenefa Foundation\" class=\"logo\">' +
          '<div class=\"icon\">\\u23F3</div>' +
          '<h1>Server is Starting Up</h1>' +
          '<p>The Duamenefa Foundation website is initializing. This usually takes a few seconds after a new deployment. The page will reload automatically.</p>' +
          '<button onclick=\"sessionStorage.removeItem(\\'' + retryKey + '\\');location.reload();\">Try Again</button>' +
          '</div>' +
          '<script>var c=parseInt(sessionStorage.getItem(\\'' + retryKey + '\\')||\\'0\\',10);if(c<8){sessionStorage.setItem(\\'' + retryKey + '\\',String(c+1));setTimeout(function(){location.reload()},3000)}else{sessionStorage.removeItem(\\'' + retryKey + '\\')}<\\/script>' +
          '</body></html>'
        );
        document.close();
      }
    } else {
      // Page loaded successfully, clear retry counter
      sessionStorage.removeItem('__pf_retry');
    }
  } catch(e) {
    // If anything goes wrong, just reload once
    try {
      if (!sessionStorage.getItem('__pf_emergency')) {
        sessionStorage.setItem('__pf_emergency', '1');
        setTimeout(function(){ location.reload(); }, 3000);
      } else {
        sessionStorage.removeItem('__pf_emergency');
      }
    } catch(e2) {}
  }
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

        {/* Register Service Worker for platform error handling */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(function(registration) {
        console.log('SW registered:', registration.scope);
        // Force update check
        registration.update();
      })
      .catch(function(error) {
        console.log('SW registration failed:', error);
      });
  });

  // Handle service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    // New service worker took control, page will be handled by new SW
    console.log('SW controller changed');
  });
}
            `,
          }}
        />
      </body>
    </html>
  );
}
