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
          #app-loader{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0B3C5D;position:fixed;inset:0;z-index:9999;transition:opacity .4s ease}
          #app-loader.loaded{opacity:0;pointer-events:none}
          #app-loader-inner{text-align:center;color:#fff;font-family:system-ui,-apple-system,sans-serif}
          #app-loader-inner .logo{width:56px;height:56px;border-radius:50%;margin:0 auto 1rem;object-fit:cover}
          #app-loader-inner h2{font-size:1.1rem;color:#D4AF37;margin:0 0 .3rem}
          #app-loader-inner p{font-size:.75rem;color:rgba(255,255,255,.5);margin:0}
          #app-loader-inner .spinner{width:24px;height:24px;border:3px solid rgba(212,175,55,.3);border-top-color:#D4AF37;border-radius:50%;animation:als .7s linear infinite;margin:1rem auto 0}
          @keyframes als{to{transform:rotate(360deg)}}
        `}} />
      </head>
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* Loading skeleton - shows instantly then hides when React hydrates */}
        <div id="app-loader">
          <div id="app-loader-inner">
            <img src="/logo.jpg" alt="Duamenefa Foundation" className="logo" />
            <h2>Duamenefa Foundation</h2>
            <p>Let Us Co-Exist in Peace</p>
            <div className="spinner" />
          </div>
        </div>
        <script dangerouslySetInnerHTML={{__html: `
(function(){
  var loader = document.getElementById('app-loader');
  if(!loader) return;
  
  function hideLoader(){
    if(!loader) return;
    loader.classList.add('loaded');
    setTimeout(function(){ if(loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 500);
  }
  
  // Method 1: Wait for body content to be hydrated (React mounts)
  // The loader is AFTER children in DOM, so when React renders content,
  // the body will have meaningful elements before the loader
  var checkCount = 0;
  var t = setInterval(function(){
    checkCount++;
    // Check if body has real content (not just the loader)
    var body = document.body;
    if(body){
      var children = body.children;
      // If there are elements before the loader, React has hydrated
      for(var i=0;i<children.length;i++){
        if(children[i].id !== 'app-loader' && children[i].children.length > 0){
          clearInterval(t);
          hideLoader();
          return;
        }
      }
    }
    // Also check if it's been too long
    if(checkCount > 30){ // ~3 seconds
      clearInterval(t);
      hideLoader();
    }
  }, 100);
  
  // Method 2: Fallback - always hide after 3 seconds
  setTimeout(hideLoader, 3000);
})();
        `}} />
      </body>
    </html>
  );
}
