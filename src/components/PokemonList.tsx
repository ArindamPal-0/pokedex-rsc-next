import { getPokemonList, getPokemonListLength } from "@/pokemonApi";
import Link from "next/link";

interface Props {
    page: number;
    perPage: number;
}

export default async function PokemonList({ page, perPage }: Props) {
    const url = new URL("index.json", process.env.POKE_API_BASEURL);

    const pokemonList = await getPokemonList();
    const pokemonListLength = await getPokemonListLength();

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const start = page === 1 ? 0 : (page - 1) * perPage;
    const end =
        page * perPage > pokemonListLength
            ? pokemonListLength - 1
            : page * perPage;

    return (
        <>
            <section className="flex flex-col items-center justify-start gap-2">
                {pokemonList.slice(start, end).map((pokemon) => (
                    <Link
                        className="text-blue-400 hover:text-blue-600"
                        href={`/pokemon/${pokemon.id}`}
                        key={pokemon.id}
                    >
                        {pokemon.name}
                    </Link>
                ))}
            </section>
        </>
    );
}
