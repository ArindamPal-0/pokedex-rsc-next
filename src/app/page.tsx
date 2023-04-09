import Loading from "@/components/Loading";
import PokemonList from "@/components/PokemonList";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default async function HomePage() {
    return (
        <Suspense fallback={<Loading />}>
            {/* @ts-expect-error Async Server Component */}
            <PokemonList />
        </Suspense>
    );
}
