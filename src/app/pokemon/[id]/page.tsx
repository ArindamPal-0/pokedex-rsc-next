import BackButton from "@/components/BackButton";
import PokemonDetails from "@/components/PokemonDetails";
import { getPokemonDetail, getPokemonList } from "@/pokemonApi";
import { Metadata } from "next";
import { z } from "zod";

export const dynamicParams = false;

interface Props {
    params: { id: string };
}

// id validation Zod Schema
const ParamsObjectSchema = z.object({
    id: z.preprocess(
        (val) => parseInt(z.string().parse(val), 10),
        z.number().positive()
    ),
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const paramsResult = ParamsObjectSchema.safeParse(params);
    if (!paramsResult.success) {
        return {};
        // throw new Error("Invalid Pokemon id.");
    }

    const { id } = paramsResult.data;

    const pokemon = await getPokemonDetail(id);

    return {
        title: pokemon.name,
    };
}

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
    const url = new URL("index.json", process.env.POKE_API_BASEURL);

    const pokemonList = await getPokemonList();

    return pokemonList.map((pokemon) => ({
        id: pokemon.id.toString(),
    }));
}

export default async function PokemonDetailsPage({ params }: Props) {
    const paramsResult = ParamsObjectSchema.safeParse(params);
    if (!paramsResult.success) {
        throw new Error("Invalid Pokemon id.");
    }

    return (
        <section className="flex flex-col items-center justify-start gap-4">
            <BackButton />
            {/* <Suspense fallback={<Loading />}> */}
            {/* @ts-expect-error Async Server Component */}
            <PokemonDetails id={paramsResult.data.id} />
            {/* </Suspense> */}
        </section>
    );
}
