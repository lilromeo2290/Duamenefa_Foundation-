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
        {/* CRITICAL: Inline CSS to fix Framer Motion SSR opacity:0 issue.
            Framer Motion sets opacity:0 on animated elements during SSR.
            This CSS makes them visible immediately, BEFORE any JS loads.
            The .fm-visible class is added per-element when Framer Motion successfully
            animates it, or as a fallback after 3 seconds for stuck elements. */}
        <style dangerouslySetInnerHTML={{__html: `
          /* Force all Framer Motion elements visible before JS hydrates */
          html:not(.fm-ready) [style*="opacity: 0"],
          html:not(.fm-ready) [style*="opacity:0"] {
            opacity: 1 !important;
            transform: none !important;
          }
          /* After fm-ready, force visible any elements that Framer Motion
             hasn't animated yet (stuck whileInView elements) */
          html.fm-ready :not(.fm-visible)[style*="opacity: 0"],
          html.fm-ready :not(.fm-visible)[style*="opacity:0"] {
            opacity: 1 !important;
            transform: none !important;
          }
        `}} />
      </head>
      <body
        className={`${poppins.variable} ${openSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* Framer Motion visibility management script:
            1. After page load, add 'fm-ready' to hand animation control to Framer Motion
            2. After 3 seconds, force any stuck opacity:0 elements visible as fallback
            3. The CSS override in <head> keeps content visible until Framer Motion animates */}
        <script dangerouslySetInnerHTML={{__html: `
(function(){
  // Mark elements that Framer Motion has successfully animated
  function observeAnimations(){
    var observer = new MutationObserver(function(mutations){
      mutations.forEach(function(m){
        if(m.type === 'attributes' && m.attributeName === 'style'){
          var el = m.target;
          if(el.style && el.style.opacity === '1'){
            el.classList.add('fm-visible');
          }
        }
      });
    });
    observer.observe(document.body, {attributes:true, subtree:true, attributeFilter:['style']});
  }

  // Add fm-ready after page load + delay for Framer Motion to initialize
  function enableFM(){
    document.documentElement.classList.add('fm-ready');
    observeAnimations();
  }

  if(document.readyState === 'complete'){
    setTimeout(enableFM, 1500);
  } else {
    window.addEventListener('load', function(){
      setTimeout(enableFM, 1500);
    });
  }

  // Fallback: after 4 seconds, force any remaining invisible elements visible
  setTimeout(function(){
    var stuck = document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]');
    for(var i=0; i<stuck.length; i++){
      stuck[i].classList.add('fm-visible');
      stuck[i].style.opacity = '1';
      stuck[i].style.transform = 'none';
    }
  }, 4000);
})();
        `}} />
      </body>
    </html>
  );
}
