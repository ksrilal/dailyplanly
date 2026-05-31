import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { DevToolsPromo } from '@/components/shared/devtools-promo'
import '@/styles/globals.css'
import '@/styles/print.css'
import { SITE_NAME, SITE_DESCRIPTION, BASE_URL } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} — Calm, Printable Productivity`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['planner', 'checklist', 'printable', 'productivity', 'template', 'PDF', 'organizer'],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Calm, Printable Productivity`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Calm, Printable Productivity`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  other: {
    // Google AdSense verification — must be in <head> for crawler
    'google-adsense-account': 'ca-pub-6494285872180880',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <DevToolsPromo />
        </ThemeProvider>
        {/* Google AdSense — strategy="afterInteractive" loads after hydration, placed in <head> by Next.js */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6494285872180880"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  )
}
