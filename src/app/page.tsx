import Loading from "@/components/Loading";
import PokemonList from "@/components/PokemonList";
import { getPokemonListLength } from "@/pokemonApi";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import { z } from "zod";

const inter = Inter({ subsets: ["latin"] });

interface Props {
    searchParams: { [key: string]: string | string[] | undefined };
}

const SearchParamsSchema = z.object({
    page: z.preprocess((val) => {
        const p = z.string().optional().parse(val);
        return p ? parseInt(p) : p;
    }, z.number().optional()),
});

export default async function HomePage({ searchParams }: Props) {
    let page = 1;
    const searchParamsResult = SearchParamsSchema.safeParse(searchParams);

    if (searchParamsResult.success) {
        page = searchParamsResult.data.page ?? 1;
    }

    // calculate the appropriate page number
    const pokemonListLength = await getPokemonListLength();
    const pokemonPerPage = 20;
    const lastPage = Math.ceil(pokemonListLength / pokemonPerPage);

    return (
        <>
            <Suspense fallback={<Loading />}>
                {/* @ts-expect-error Async Server Component */}
                <PokemonList page={page} perPage={pokemonPerPage} />
            </Suspense>
            <section className="mt-4 flex items-center justify-center gap-2 rounded border p-2">
                <Link
                    className={`${
                        page > 1
                            ? "text-blue-400 hover:text-blue-600"
                            : "pointer-events-none text-blue-300"
                    } underline`}
                    href={{ pathname: "/", query: { page: page - 1 } }}
                >
                    prev
                </Link>
                <span>{page}</span>
                <Link
                    className={`${
                        page < lastPage
                            ? "text-blue-400 hover:text-blue-600"
                            : "pointer-events-none text-blue-300"
                    } underline`}
                    href={{ pathname: "/", query: { page: page + 1 } }}
                >
                    next
                </Link>
            </section>
        </>
    );
}
