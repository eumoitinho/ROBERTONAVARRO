import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Roberto Navarro | Transforme sua Mentalidade",
  description:
    "Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KB66J525');
            `,
          }}
        />
      <body className={`${montserrat.variable} font-montserrat`}>
{/* Google Tag Manager (noscript) */}
<noscript>
  <iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-KB66J525"
    height={0}
    width={0}
    style={{ display: "none", visibility: "hidden" }}
  ></iframe>
</noscript>
{/* End Google Tag Manager (noscript) */}
{/* <script
  type="rocketlazyloadscript"
  dangerouslySetInnerHTML={{
    __html: `(function(l,d,t,r,c,k){
      if(!l.lt){l.lt=l.lt||{_c:[]};
      c=d.getElementsByTagName('head')[0];
      k=d.createElement('script');k.async=1;
      k.src=t;c.appendChild(k);}
      l.ltq = l.ltq || function(k,v){l.lt._c.push([k,v])};
      ltq('init', '2Zz-0')
    })(window,document,'//tag.ltrck.com.br/lt11505.js?wp=1');`,
  }}
></script> */}
<Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        
        
      </body>
    </html>
  )
}
