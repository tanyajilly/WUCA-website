import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

import Breadcrumbs from "@/app/ui/breadcrumbs";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/header";
import i18nConfig from '@/i18n-config';
import { dir } from 'i18next';
import initTranslations from '../i18n';
import TranslationsProvider from "../context/translations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: '%s | WUCA',
        default: 'Winchester Ukrainian Cultural Association',
      },
    description: "The Winchester Ukrainian Cultural Association unites the Ukrainian community in Hampshire, offering cultural preservation, educational programs, and support for Ukrainians in the UK.",
    keywords: ['Winchester', 'Ukraine', 'Winchester Ukrainian Association', 'Ukrainian Heritage', 'Cultural Integration', 'Ukrainian Support Hampshire', 'Ukrainian Events', 'Community Support', 'Ukrainian Art', 'Educational Programs', 'Volunteer Opportunities', 'Traditional Events', 'Refugees Support'],
    alternates: {
        canonical: '/',
        languages: {
        'uk-UA': '/uk',
        },
    },
    openGraph: {
        images: '/logo.jpg',
    },
};

export function generateStaticParams() {
    return i18nConfig.locales.map(locale => ({ locale }));
  }

export default async function RootLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}) {
    const i18nNamespaces = ['default', 'home', 'breadcrumbs', 'error'];
    const { resources } = await initTranslations(locale, i18nNamespaces);
    return (
        <html lang={locale} dir={dir(locale)}>
            <body className={inter.className}>
                <TranslationsProvider
                    namespaces={i18nNamespaces}
                    locale={locale}
                    resources={resources}
                >
                    <div className="flex min-h-screen flex-col items-center justify-between">
                        <Header locale={locale} />
                        <div className="container mx-auto p-4 flex-1">
                            <Breadcrumbs />
                            <main>{children}</main>
                        </div>
                        <Footer locale={locale} />
                    </div>
                </TranslationsProvider>
            </body>
        </html>
    );
}