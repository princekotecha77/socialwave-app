import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SocialWave - Next-Gen Social Media',
  description: 'Instagram reimagined with superior UX and offline-first architecture',
  manifest: '/manifest.json',
  themeColor: '#E1306C',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-light dark:bg-dark">
          {children}
        </div>
      </body>
    </html>
  )
}
