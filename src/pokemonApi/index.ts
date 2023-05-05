import { z } from "zod";

// Pokemon Zod Schema
const PokemonSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
});

// Pokemon type
export type Pokemon = z.infer<typeof PokemonSchema>;

// Pokemon List Zod Schema
const PokemonListSchema = z.array(PokemonSchema);

// server side caching to prevent calling API multiple times
const pokemonAPICache = new Map<string | string[], any>();

/**
 * getPokemonList
 *
 * returns a list of pokemon with enough details to render.
 *
 * @returns Promise<Pokemon[]>
 */
export async function getPokemonList(): Promise<Pokemon[]> {
    const url = new URL("index.json", process.env.POKE_API_BASEURL);

    if (pokemonAPICache.has("pokemon")) {
        return PokemonListSchema.parse(pokemonAPICache.get("pokemon"));
    }

    const pokemonList = await fetch(url, { cache: "force-cache" })
        .then((res) => res.json())
        .then((value) => PokemonListSchema.parseAsync(value));

    pokemonAPICache.set("pokemon", pokemonList);

    return pokemonList;
}

export async function getPokemonListLength() {
    if (pokemonAPICache.has(["pokemon", "length"])) {
        return pokemonAPICache.get(["pokemon", "length"]);
    }
    const pokemonList = await getPokemonList();
    pokemonAPICache.set(["pokemon", "length"], pokemonList.length);
    return pokemonList.length;
}

const PokemonDetailSchema = z.object({
    name: z.string(),
    type: z.array(z.string()),
    stats: z.array(
        z.object({ name: z.string(), value: z.number().positive() })
    ),
    image: z.preprocess(
        (val) =>
            new URL(z.string().parse(val), process.env.POKE_API_BASEURL).href,
        z.string().url()
    ),
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;

export async function getPokemonDetail(id: number): Promise<PokemonDetail> {
    if (pokemonAPICache.has(["pokemon", id.toString()])) {
        return PokemonDetailSchema.parse(
            pokemonAPICache.get(["pokemon", id.toString()])
        );
    }

    const url = new URL(`pokemon/${id}.json`, process.env.POKE_API_BASEURL);
    // console.log(url.href);

    const pokemon = await fetch(url)
        .then((res) => res.json())
        .then((value) => PokemonDetailSchema.parseAsync(value));

    pokemonAPICache.set(["pokemon", id.toString()], pokemon);

    return pokemon;
}
