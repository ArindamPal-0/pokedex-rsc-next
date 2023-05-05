import { getPokemonDetail } from "@/pokemonApi";
import Image from "next/image";

export default async function PokemonDetails({ id }: { id: number }) {
    const pokemonDetail = await getPokemonDetail(id);

    // console.log(pokemon.image);

    return (
        <section className="flex w-80 flex-col items-center justify-center gap-2 rounded border-2">
            <div>{pokemonDetail.name}</div>
            <div className="flex gap-2">
                {pokemonDetail.type.map((t) => (
                    <div key={t}>{t}</div>
                ))}
            </div>
            <div className="relative h-40 w-40">
                <Image
                    src={pokemonDetail.image}
                    alt={pokemonDetail.name}
                    fill={true}
                    className="object-contain"
                />
            </div>
        </section>
    );
}
