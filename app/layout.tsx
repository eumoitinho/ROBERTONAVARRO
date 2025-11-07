import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { UTMTracker } from "@/components/utm-tracker"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Roberto Navarro | Transforme sua Mentalidade",
  description:
    "Descubra as chaves para destravar uma mentalidade de riqueza e alcançar novos patamares no seu negócio.",
  generator: "Moitinho.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-KB66J525" />
       <body className={`${montserrat.variable} font-montserrat`}>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel-base" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '529635403083441');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=529635403083441&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {/* GoupCompany Tracking */}
        <Script 
          src="https://link.goupcompany.com.br/js/external-tracking.js"
          data-tracking-id="tk_2828943c8f264b83941c44da804cc285"
          strategy="afterInteractive"
        />
       
<Analytics />
        <UTMTracker />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
