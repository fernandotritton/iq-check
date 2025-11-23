import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: '--font-montserrat',
});

export const metadata: Metadata = {
    title: "IQCheck - Descubre tu Verdadero Potencial Cognitivo",
    description: "Test de coeficiente intelectual profesional. Descubre tu CI en 15 minutos con análisis detallado por categorías.",
    keywords: ["test de IQ", "coeficiente intelectual", "test cognitivo", "inteligencia"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-background`}
                suppressHydrationWarning
            >
                {/* Google Analytics - Replace with your actual GA4 Measurement ID */}
                {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
                    <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
                )}
                {children}
            </body>
        </html>
    );
}
