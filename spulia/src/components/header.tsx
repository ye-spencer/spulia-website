"use client";
import { getDays } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [daysSince, setDaysSince] = useState<number | null>(null);

    useEffect(() => {
        async function fetchDays() {
            try {
                const days = await getDays();
                setDaysSince(days);
            } catch (error) {
                console.error("Failed to fetch days:", error);
                setDaysSince(null);
            }
        }
        fetchDays();
    }, []);

    return (
        <header className="w-full flex items-center justify-between px-8 py-4 bg-white text-gray-900 border-b border-gray-200">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 flex items-center gap-2">
                    <span role="img" aria-label="sparkling heart" className="text-lg animate-bounce">💖</span>
                    <span>Spulia</span>
                </h1>
                <span className="text-sm text-gray-600 font-semibold bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                    {"Days: "}
                    <span className="font-bold text-gray-800">{daysSince !== null ? daysSince : "--"}</span>
                </span>
            </div>
            <nav className="flex gap-4">
                <Link
                    href="/"
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors duration-150 border border-gray-200"
                >
                    <span role="img" aria-label="house">🏡</span> Home
                </Link>
                <Link
                    href="/login"
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors duration-150 border border-gray-200"
                >
                    <span role="img" aria-label="key">🔑</span> Login
                </Link>
            </nav>
        </header>
    );
}
