"use client";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Login() {

    const [user, setUser] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        console.log(user, password);
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <Header />
            <div className="w-full max-w-md mt-16 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 items-center border border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-2">
                    Login
                </h1>
                <div className="flex gap-4 w-full justify-center">
                    <Button
                        className={`flex-1 py-3 text-lg font-semibold rounded-full ${
                            user === "Spencer"
                                ? "border-2 border-pink-500 bg-pink-50"
                                : "bg-gray-100 border border-gray-200"
                        } text-gray-800 hover:bg-gray-200 transition`}
                        onClick={() => setUser("Spencer")}
                    >
                        Spencer
                    </Button>
                    <Button
                        className={`flex-1 py-3 text-lg font-semibold rounded-full ${
                            user === "Julia"
                                ? "border-2 border-pink-500 bg-pink-50"
                                : "bg-gray-100 border border-gray-200"
                        } text-gray-800 hover:bg-gray-200 transition`}
                        onClick={() => setUser("Julia")}
                    >
                        Julia
                    </Button>
                </div>
                <form className="w-full flex flex-col gap-4 mt-4">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        className="mt-2 w-full py-3 rounded-full bg-gray-100 text-gray-800 font-bold text-lg border border-gray-200 shadow-md hover:bg-gray-200 transition"
                        onClick={() => handleLogin()}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}