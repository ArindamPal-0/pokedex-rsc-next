import Loading from "@/components/Loading";
import PokemonDetails from "@/components/PokemonDetail";
import { Suspense } from "react";
import { z } from "zod";

export default async function PokemonDetailsPage({ params }) {
    // id validation Zod Schema

    const IdObjectSchema = z.object({
        id: z.preprocess(
            (val) => parseInt(z.string().parse(val), 10),
            z.number().positive()
        ),
    });

    const idResult = IdObjectSchema.safeParse(params);
    if (!idResult.success) {
        throw new Error("Invalid Pokemon id.");
    }

    return (
        <Suspense fallback={<Loading />}>
            {/* @ts-expect-error Async Server Component */}
            <PokemonDetails id={idResult.data.id} />
        </Suspense>
    );
}
