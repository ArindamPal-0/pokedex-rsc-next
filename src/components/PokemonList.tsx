import Link from "next/link";
import { z } from "zod";

export default async function PokemonList() {
    // API URL Zod Schema
    const ApiUrlSchema = z.string().url();

    const apiUrlResult = ApiUrlSchema.safeParse(process.env.POKE_API_BASEURL);
    if (!apiUrlResult.success) {
        if (apiUrlResult.error.errors[0].message === "Invalid url") {
            throw new Error("API URL should be of a proper URL format.");
        }

        throw new Error("API URL should not be undefined.");
    }

    const url = new URL("index.json", apiUrlResult.data);

    // Pokemon Zod Schema
    const PokemonSchema = z.object({
        id: z.number(),
        name: z.string(),
        image: z.string(),
    });

    // Pokemon List Zod Schema
    const PokemonListSchema = z.array(PokemonSchema);

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
