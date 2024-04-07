import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ThemeProvider";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Madison Funderburk",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${GeistSans.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Toaster />
                    <Navbar />
                    <div>{children}</div>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
