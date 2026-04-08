import LoginWall from '@/components/LoginWall';
import type { Metadata } from 'next';
import { Playfair_Display, Inter, Montserrat } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';       // ← ADDED
import FloatingContact from '@/components/FloatingContact'; // ← ADDED
import AIAssistant from '@/components/AIAssistant'; // ← ADDED
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Iced Chocolate Matcha Latte | Energy Meets Harmony',
  description: 'Premium ceremonial grade matcha meets rich Belgian chocolate in the perfect iced beverage. Sustained energy, enhanced focus, zero sugar. $7.50',
  keywords: 'matcha latte, chocolate matcha, iced latte, energy drink, ceremonial matcha, healthy beverage, premium drink',
  metadataBase: new URL('https://matcha-latte-scrollytelling.vercel.app'), // Replace with actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Iced Chocolate Matcha Latte',
    description: 'The perfect blend of energy and zen. Experience the scrollytelling journey.',
    url: '/',
    siteName: 'Iced Chocolate Matcha Latte',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Iced Chocolate Matcha Latte Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iced Chocolate Matcha Latte',
    description: 'Premium energy and harmony in every bottle. Explore the scrollytelling experience.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <LoginWall>
        <CustomCursor />        {/* ← ADDED */}
        <FloatingContact />     {/* ← ADDED */}
        <AIAssistant />         {/* ← ADDED */}
        {children}
         </LoginWall>
      </body>
    </html>
  );
}
