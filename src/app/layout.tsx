import { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pokédex",
    description: "Pokédex App using RSC and Next13",
};

// API URL Zod Schema
const ApiUrlSchema = z.string().url();

// process.env.POKE_API_BASEURL check
const apiUrlResult = ApiUrlSchema.safeParse(process.env.POKE_API_BASEURL);
if (!apiUrlResult.success) {
    if (apiUrlResult.error.errors[0].message === "Invalid url") {
        throw new Error("API URL should be of a proper URL format.");
    }

    throw new Error("API URL should not be undefined.");
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <section className="flex min-h-screen flex-col items-center justify-start gap-4 p-24">
                    <header>
                        <Link href="/">
                            <h1 className="text-3xl font-semibold underline">
                                Pokédex
                            </h1>
                        </Link>
                    </header>
                    <main>{children}</main>
                </section>
            </body>
        </html>
    );
}
