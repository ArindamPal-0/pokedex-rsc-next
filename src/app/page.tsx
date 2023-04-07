import Loading from "@/components/Loading";
import PokemonList from "@/components/PokemonList";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <PokemonList />
        </Suspense>
    );
}
