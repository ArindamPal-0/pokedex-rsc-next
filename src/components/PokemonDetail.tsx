import Image from "next/image";
import { z } from "zod";

export default async function PokemonDetails({ id }: { id: number }) {
    // API URL Zod Schema
    const ApiUrlSchema = z.string().url();

    const apiUrlResult = ApiUrlSchema.safeParse(process.env.POKE_API_BASEURL);
    if (!apiUrlResult.success) {
        if (apiUrlResult.error.errors[0].message === "Invalid url") {
            throw new Error("API URL should be of a proper URL format.");
        }

        throw new Error("API URL should not be undefined.");
    }
    // console.log(params);

    const url = new URL(`pokemon/${id}.json`, apiUrlResult.data);
    // console.log(url.href);

    const PokemonDetailsSchema = z.object({
        name: z.string(),
        type: z.array(z.string()),
        stats: z.array(
            z.object({ name: z.string(), value: z.number().positive() })
        ),
        image: z.preprocess(
            (val) => new URL(z.string().parse(val), apiUrlResult.data).href,
            z.string().url()
        ),
    });

    type PokemonDetails = z.infer<typeof PokemonDetailsSchema>;

    const pokemon = await fetch(url)
        .then((res) => res.json())
        .then((value) => PokemonDetailsSchema.parseAsync(value));

    console.log(pokemon.image);

    return (
        <section className="flex w-80 flex-col items-center justify-center gap-2 rounded border-2">
            <div>{pokemon.name}</div>
            <div className="flex gap-2">
                {pokemon.type.map((t) => (
                    <div key={t}>{t}</div>
                ))}
            </div>
            <div className="relative h-40 w-40">
                <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    fill={true}
                    className="object-contain"
                />
            </div>
        </section>
    );
}
