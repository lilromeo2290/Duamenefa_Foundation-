import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://duamenefa.org"),
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
        {/* Minimal loading indicator - only visible during initial paint */}
        <style dangerouslySetInnerHTML={{__html: `
          #app-loader{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0B3C5D;position:fixed;inset:0;z-index:9999;transition:opacity .3s ease}
          #app-loader.loaded{opacity:0;pointer-events:none}
          #app-loader-inner{text-align:center;color:#fff;font-family:system-ui,-apple-system,sans-serif}
          #app-loader-inner .spinner{width:28px;height:28px;border:3px solid rgba(212,175,55,.3);border-top-color:#D4AF37;border-radius:50%;animation:als .7s linear infinite;margin:0 auto}
          @keyframes als{to{transform:rotate(360deg)}}
        `}} />
      </head>
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* Lightweight loading indicator - shows spinner, hides when content renders */}
        <div id="app-loader">
          <div id="app-loader-inner">
            <div className="spinner" />
          </div>
        </div>
        <script dangerouslySetInnerHTML={{__html: `
(function(){
  // 1. Hide the loading spinner as soon as content is available
  var loader = document.getElementById('app-loader');
  function hideLoader(){
    if(!loader) return;
    loader.classList.add('loaded');
    setTimeout(function(){ if(loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 400);
  }

  // Check if body has real content (React has hydrated)
  var checkCount = 0;
  var t = setInterval(function(){
    checkCount++;
    var body = document.body;
    if(body){
      var ch = body.children;
      for(var i=0;i<ch.length;i++){
        if(ch[i].id !== 'app-loader' && ch[i].children.length > 0){
          clearInterval(t);
          hideLoader();
          return;
        }
      }
    }
    if(checkCount > 20){ clearInterval(t); hideLoader(); }
  }, 50);
  setTimeout(hideLoader, 2000);

  // 2. Enable Framer Motion animations after hydration
  // The CSS override (globals.css) makes content visible before JS loads.
  // After React hydrates and Framer Motion initializes, we add 'fm-ready'
  // which removes the CSS override and lets Framer Motion control animations.
  function enableFM(){
    document.documentElement.classList.add('fm-ready');
  }
  if(document.readyState === 'complete'){
    setTimeout(enableFM, 500);
  } else {
    window.addEventListener('load', function(){
      setTimeout(enableFM, 500);
    });
  }
})();
        `}} />
      </body>
    </html>
  );
}
