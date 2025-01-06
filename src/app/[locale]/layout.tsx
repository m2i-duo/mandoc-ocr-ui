import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {ReactNode} from "react";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import {getMessages} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {MandocContextProvider} from "@/context/mandoc-ocr-context";
import Header from "@/app/[locale]/_components/header";
import {Toaster} from "@/components/ui/toaster";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "mandoc-ocr",
    description: "A web interface for a deep learning model using CRNN CTC layers for OCR",
};

export default async function LocaleLayout({ children, params: {locale}}: { children: ReactNode; params: {locale: string}; }) {
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
    return (
        <html lang="en">
        <head>
            <title>ARAPT</title>
            <meta name="apple-mobile-web-app-title" content="mandoc-ocr"/>
        </head>

        <NextIntlClientProvider messages={messages}>
            <body
                style={{direction: locale === "ar" ? "rtl" : "ltr"}}
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <MandocContextProvider>
                    <main className="h-screen sm:p-16 font-[family-name:var(--font-geist-sans)]">
                        <div className="p-2 w-full h-full flex flex-col gap-2 items-center sm:items-start">
                            <Header />
                            <section className={"w-full h-full flex items-center justify-center flex-col gap-2"}>
                                {
                                    children
                                }
                            </section>
                        </div>
                    </main>
                    <Toaster />
                </MandocContextProvider>
            </ThemeProvider>
            </body>
        </NextIntlClientProvider>
        </html>
    )
        ;
}
