import Loading from "@/components/Loading";
import PokemonDetails, {
    PokemonDetailsSchema,
} from "@/components/PokemonDetail";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { z } from "zod";

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

export async function generateMetadata(
    { params }: Props,
    parent?: ResolvingMetadata
): Promise<Metadata> {
    const paramsResult = ParamsObjectSchema.safeParse(params);
    if (!paramsResult.success) {
        throw new Error("Invalid Pokemon id.");
    }

    const { id } = paramsResult.data;

    const url = new URL(`pokemon/${id}.json`, process.env.POKE_API_BASEURL);

    const pokemon = await fetch(url)
        .then((res) => res.json())
        .then((value) => PokemonDetailsSchema.parseAsync(value));

    return {
        title: pokemon.name,
    };
}

export default async function PokemonDetailsPage({ params }: Props) {
    const paramsResult = ParamsObjectSchema.safeParse(params);
    if (!paramsResult.success) {
        throw new Error("Invalid Pokemon id.");
    }

    return (
        <section className="flex flex-col items-center justify-start gap-4">
            <Link
                className="flex items-center justify-center gap-2 text-blue-400 underline hover:text-blue-600"
                href="/"
            >
                {/* back icon */}
                <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-4 w-4"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    ></path>
                </svg>
                <span>back</span>
            </Link>
            <Suspense fallback={<Loading />}>
                {/* @ts-expect-error Async Server Component */}
                <PokemonDetails id={paramsResult.data.id} />
            </Suspense>
        </section>
    );
}
