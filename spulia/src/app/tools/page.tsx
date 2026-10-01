"use client";

import Header from "@/components/header";
import { useState } from "react";

// How many numbers to generate per check-in.
const PICK_COUNT = 5;
// Smallest check-in that still has enough distinct values in 1..input to
// produce PICK_COUNT numbers without repeating.
const MIN_INPUT = PICK_COUNT;

// How flat the weighting is. A flat baseline of FLATNESS * checkIn is added to
// every candidate's weight, softening the bias toward larger numbers. 0 = pure
// linear (strong top-bias); higher = closer to uniform.
const FLATNESS = 1;

/**
 * Picks PICK_COUNT distinct numbers from 1..checkIn (the input is the upper
 * bound; 0 is excluded). Numbers closer to the check-in are more likely, with
 * probability falling off linearly as they get smaller. Sampling is done
 * without replacement so the picks are distinct.
 */
function pickNumbers(checkIn: number): number[] {
    const candidates = Array.from({ length: checkIn }, (_, i) => i + 1);
    // Linear weight toward the top, plus a flat baseline that scales with the
    // input so the bias is gentle regardless of how large the check-in is.
    const base = FLATNESS * checkIn;
    const weights = candidates.map((n) => n + base);

    const picks: number[] = [];
    const count = Math.min(PICK_COUNT, candidates.length);
    for (let k = 0; k < count; k++) {
        let total = 0;
        for (let i = 0; i < candidates.length; i++) total += weights[i];

        let r = Math.random() * total;
        let chosen = 0;
        for (let i = 0; i < candidates.length; i++) {
            r -= weights[i];
            if (r <= 0) {
                chosen = i;
                break;
            }
        }

        picks.push(candidates[chosen]);
        // Remove the chosen candidate so it can't be picked again.
        candidates.splice(chosen, 1);
        weights.splice(chosen, 1);
    }

    return picks;
}

function ToolBox({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="w-full bg-white rounded-2xl border border-indigo-100 shadow-md p-5 flex flex-col gap-3">
            <div>
                <h2 className="font-bold text-indigo-700 text-lg">{title}</h2>
                {description && <p className="text-gray-400 text-sm">{description}</p>}
            </div>
            {children}
        </div>
    );
}

function CheckInNumberTool() {
    const [checkIn, setCheckIn] = useState("");
    const [numbers, setNumbers] = useState<number[] | null>(null);

    const parsed = parseInt(checkIn, 10);
    const valid = !Number.isNaN(parsed) && parsed >= MIN_INPUT;

    function handleGenerate() {
        if (!valid) return;
        setNumbers(pickNumbers(parsed));
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2">
                <input
                    type="number"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full"
                    placeholder="Check-in number"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                />
                <button
                    onClick={handleGenerate}
                    disabled={!valid}
                    className="px-5 py-2 rounded-full bg-indigo-500 text-white font-semibold text-sm hover:bg-indigo-600 transition disabled:opacity-50 shrink-0"
                >
                    Generate
                </button>
            </div>

            {checkIn.trim() !== "" && !valid && (
                <p className="text-xs text-gray-400">
                    Enter a number of at least {MIN_INPUT}.
                </p>
            )}

            {numbers && (
                <div className="flex flex-wrap gap-2">
                    {numbers.map((num, i) => (
                        <span
                            key={i}
                            className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold text-lg"
                        >
                            {num}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center pb-16">
            <Header />
            <main className="w-full max-w-2xl flex flex-col items-center px-4">
                <h1 className="mt-8 mb-1 text-4xl font-extrabold tracking-tight text-indigo-700 drop-shadow-lg">
                    Tools
                </h1>
                <p className="text-gray-400 mb-8 text-sm">Handy tools for us 🛠️</p>

                <div className="w-full flex flex-col gap-4">
                    <ToolBox
                        title="Check-in Number"
                        description="Enter a check-in number to generate 5 smaller numbers, favoring ones close to it."
                    >
                        <CheckInNumberTool />
                    </ToolBox>
                </div>
            </main>
        </div>
    );
}
