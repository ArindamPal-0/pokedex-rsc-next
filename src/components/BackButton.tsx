"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            className="flex items-center justify-center gap-2 text-blue-400 underline hover:text-blue-600"
            onClick={() => router.back()}
        >
            {/* back icon */}
            <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-4 w-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                ></path>
            </svg>
            <span>back</span>
        </button>
    );
}
