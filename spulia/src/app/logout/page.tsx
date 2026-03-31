"use client";

import Header from "@/components/header";
import { usePersonStore } from "@/lib/localStorage";
import { useRouter } from "next/navigation";

export default function Logout() {
    const { person, setPerson } = usePersonStore();
    const router = useRouter();

    function handleLogout() {
        setPerson("");
        router.push("/");
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <Header />
            <div className="w-full max-w-md mt-16 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 items-center border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800">Logged in as {person}</h1>
                <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-full bg-gray-100 text-gray-800 font-bold text-lg border border-gray-200 shadow-md hover:bg-gray-200 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
