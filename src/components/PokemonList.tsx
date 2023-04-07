import { z } from "zod";

export default async function PokemonList() {
    // API URL Zod Schema
    const APISchema = z.string().url();

    const result = APISchema.safeParse(process.env.POKE_API_BASEURL);
    if (!result.success) {
        if (result.error.errors[0].message === "Invalid url") {
            throw new Error("API URL should be of a proper URL format.");
        }

        throw new Error("API URL should not be undefined.");
    }

    const url = new URL("index.json", result.data);

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

    // await new Promise((resol ve) => setTimeout(resolve, 2000));

    return (
        <>
            <section>
                {pokemonList.slice(0, 20).map((pokemon) => (
                    <div key={pokemon.id}>{pokemon.name}</div>
                ))}
            </section>
        </>
    );
}
