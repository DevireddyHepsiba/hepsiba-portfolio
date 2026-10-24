import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
const inter = localFont({ src: '../public/fonts/inter-latin-variable.woff2', variable: '--font-inter', display: 'swap', weight: '100 900' });
const space = localFont({ src: '../public/fonts/space-grotesk-latin-variable.woff2', variable: '--font-space', display: 'swap', weight: '300 700' });
const profiles = ['https://github.com/DevireddyHepsiba', 'https://www.linkedin.com/in/hepsiba-devireddy-2685622a6/', 'https://leetcode.com/u/Striver_girl/'];
export const metadata: Metadata = {
  title: 'Hepsiba Devireddy — Full-Stack Developer',
  description: 'Computer Science and Engineering student at SRKR Engineering College, building full-stack web applications and exploring AI-powered experiences.',
  openGraph: { title: 'Hepsiba Devireddy — Full-Stack Developer', description: 'Building the web. Exploring what comes next.', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = { '@context': 'https://schema.org', '@type': 'Person', name: 'Hepsiba Devireddy', jobTitle: 'Full-Stack Web Developer', email: 'hepsibadevireddy@gmail.com', telephone: '+91-7702997635', address: { '@type': 'PostalAddress', addressLocality: 'Bhimavaram', addressRegion: 'Andhra Pradesh', addressCountry: 'IN' }, description: 'Computer Science and Engineering student at SRKR Engineering College, interested in full-stack web development and AI-powered applications.', sameAs: profiles };
  return <html lang="en"><body className={`${inter.variable} ${space.variable}`}>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} /></body></html>;
}
