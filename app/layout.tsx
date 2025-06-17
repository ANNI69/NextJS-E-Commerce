import type { Metadata } from 'next';
import { AppProviders } from "@/context"
import './globals.css';

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'A modern e-commerce application built with Next.js and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
