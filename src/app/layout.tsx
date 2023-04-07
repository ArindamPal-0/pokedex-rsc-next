import "./globals.css";

export const metadata = {
    title: "Pokédex",
    description: "Pokédex App using RSC and Next13",
};

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
                        <h1 className="text-3xl font-semibold underline">
                            Pokédex
                        </h1>
                    </header>
                    <main>{children}</main>
                </section>
            </body>
        </html>
    );
}
