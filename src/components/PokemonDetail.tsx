import Image from "next/image";
import { z } from "zod";

export const PokemonDetailsSchema = z.object({
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

export type PokemonDetails = z.infer<typeof PokemonDetailsSchema>;

export default async function PokemonDetails({ id }: { id: number }) {
    const url = new URL(`pokemon/${id}.json`, process.env.POKE_API_BASEURL);
    // console.log(url.href);

    const pokemon = await fetch(url)
        .then((res) => res.json())
        .then((value) => PokemonDetailsSchema.parseAsync(value));

    // console.log(pokemon.image);

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
