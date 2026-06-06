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
        <style dangerouslySetInnerHTML={{__html: `
          #app-loader{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0B3C5D;position:fixed;inset:0;z-index:9999;transition:opacity .3s}
          #app-loader.hide{opacity:0;pointer-events:none}
          #app-loader-inner{text-align:center;color:#fff;font-family:system-ui,-apple-system,sans-serif}
          #app-loader-inner .logo{width:56px;height:56px;border-radius:50%;margin:0 auto 1rem;object-fit:cover}
          #app-loader-inner h2{font-size:1.1rem;color:#D4AF37;margin:0 0 .3rem}
          #app-loader-inner p{font-size:.75rem;color:rgba(255,255,255,.5);margin:0}
          #app-loader-inner .spinner{width:24px;height:24px;border:3px solid rgba(212,175,55,.3);border-top-color:#D4AF37;border-radius:50%;animation:als .7s linear infinite;margin:1rem auto 0}
          @keyframes als{to{transform:rotate(360deg)}}
        `}} />
        <script dangerouslySetInnerHTML={{__html: `
(function(){
  // Hide loader once React mounts content
  var done=false;
  function hideLoader(){
    if(done)return;done=true;
    var el=document.getElementById('app-loader');
    if(el){el.classList.add('hide');setTimeout(function(){el.remove()},400);}
  }
  // Check periodically for React content
  var t=setInterval(function(){
    var root=document.getElementById('__next');
    if(root&&root.children.length>0){clearInterval(t);hideLoader();}
  },80);
  // Fallback: hide after 2.5s regardless
  setTimeout(function(){clearInterval(t);hideLoader();},2500);
})();
        `}} />
      </head>
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}
      >
        {/* Instant loading skeleton - shows before React hydrates */}
        <div id="app-loader">
          <div id="app-loader-inner">
            <img src="/logo.jpg" alt="Duamenefa Foundation" className="logo" />
            <h2>Duamenefa Foundation</h2>
            <p>Let Us Co-Exist in Peace</p>
            <div className="spinner" />
          </div>
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
