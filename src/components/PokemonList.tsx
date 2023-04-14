import Link from "next/link";
import { z } from "zod";

// Pokemon Zod Schema
export const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
});

// Pokemon List Zod Schema
export const PokemonListSchema = z.array(PokemonSchema);

export default async function PokemonList() {
    const url = new URL("index.json", process.env.POKE_API_BASEURL);

    const pokemonList = await fetch(url, { cache: "no-cache" })
        .then((res) => res.json())
        .then((value) => PokemonListSchema.parseAsync(value));

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <>
            <section className="flex flex-col items-center justify-start gap-2">
                {pokemonList.slice(0, 20).map((pokemon) => (
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
