import type { Metadata, Viewport } from 'next'
import { Cinzel, Crimson_Text } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ApiStatus } from '@/components/ApiStatus'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const crimsonText = Crimson_Text({ 
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hekara - AI Grimoire & Tarot Reader',
  description: 'Craft personalized spells and receive mystical tarot readings powered by ancient wisdom and modern AI. Your digital Book of Shadows awaits.',
  keywords: ['witchcraft', 'tarot', 'spells', 'grimoire', 'magic', 'divination', 'AI'],
  authors: [{ name: 'Hekara' }],
  openGraph: {
    title: 'Hekara - AI Grimoire & Tarot Reader',
    description: 'Craft personalized spells and receive mystical tarot readings',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonText.variable} bg-background`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <ApiStatus />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
