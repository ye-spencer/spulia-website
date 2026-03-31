"use client";

import Header from "@/components/header";
import { usePersonStore } from "@/lib/localStorage";
import { DateBucketlistItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function groupByCity(items: DateBucketlistItem[]): Record<string, DateBucketlistItem[]> {
    return items.reduce((acc, item) => {
        if (!acc[item.city]) acc[item.city] = [];
        acc[item.city].push(item);
        return acc;
    }, {} as Record<string, DateBucketlistItem[]>);
}

interface EditState {
    title: string;
    description: string;
    city: string;
}

function DateCard({
    item,
    isLoggedIn,
    onToggleDone,
    onEdit,
}: {
    item: DateBucketlistItem;
    isLoggedIn: boolean;
    onToggleDone: (id: number, done: boolean) => void;
    onEdit: (id: number, data: EditState) => void;
}) {
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState<EditState>({
        title: item.title,
        description: item.description,
        city: item.city,
    });

    function handleSave() {
        if (!editData.title.trim() || !editData.city.trim()) return;
        onEdit(item.id, editData);
        setEditing(false);
    }

    if (editing) {
        return (
            <div className="bg-white rounded-xl border border-rose-300 shadow p-4 flex flex-col gap-2.5">
                <input
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-800 font-semibold w-full focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                    value={editData.title}
                    onChange={(e) => setEditData((d) => ({ ...d, title: e.target.value }))}
                    placeholder="Title *"
                />
                <textarea
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 w-full resize-none focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                    rows={2}
                    value={editData.description}
                    onChange={(e) => setEditData((d) => ({ ...d, description: e.target.value }))}
                    placeholder="Description"
                />
                <input
                    className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm"
                    value={editData.city}
                    onChange={(e) => setEditData((d) => ({ ...d, city: e.target.value }))}
                    placeholder="City *"
                />
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => setEditing(false)}
                        className="px-3 py-1 rounded-full text-gray-600 bg-gray-100 border border-gray-200 hover:bg-gray-200 text-xs transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!editData.title.trim() || !editData.city.trim()}
                        className="px-3 py-1 rounded-full text-white bg-rose-500 border border-rose-400 hover:bg-rose-600 text-xs transition disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-1.5 ${
                item.done ? "border-gray-200" : "border-rose-100"
            }`}
        >
            <div className="flex items-start justify-between gap-2">
                <h3
                    className={`font-semibold text-base leading-snug ${
                        item.done ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                >
                    {item.title}
                </h3>
                {isLoggedIn && (
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                        <button
                            onClick={() => setEditing(true)}
                            className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200 transition"
                        >
                            Edit
                        </button>
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={(e) => onToggleDone(item.id, e.target.checked)}
                            className="w-4 h-4 accent-rose-500 cursor-pointer"
                            title={item.done ? "Mark as active" : "Mark as done"}
                        />
                    </div>
                )}
            </div>
            {item.description && (
                <p className={`text-sm ${item.done ? "text-gray-400" : "text-gray-600"}`}>
                    {item.description}
                </p>
            )}
            <div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-0.5">
                <span>📍 {item.city}</span>
                <span>👤 {item.addedBy}</span>
                <span>📅 {formatDate(item.createdAt)}</span>
            </div>
        </div>
    );
}

function CityGroup({
    city,
    items,
    isLoggedIn,
    onToggleDone,
    onEdit,
}: {
    city: string;
    items: DateBucketlistItem[];
    isLoggedIn: boolean;
    onToggleDone: (id: number, done: boolean) => void;
    onEdit: (id: number, data: EditState) => void;
}) {
    const [cityOpen, setCityOpen] = useState(true);
    const [activeOpen, setActiveOpen] = useState(true);
    const [doneOpen, setDoneOpen] = useState(false);

    const active = items.filter((i) => !i.done);
    const done = items.filter((i) => i.done);

    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <button
                className="w-full flex items-center justify-between px-5 py-3.5 bg-rose-50 hover:bg-rose-100 transition text-left"
                onClick={() => setCityOpen((o) => !o)}
            >
                <span className="font-bold text-rose-800 text-lg">📍 {city}</span>
                <span className="text-gray-400 text-sm select-none">{cityOpen ? "▲" : "▼"}</span>
            </button>

            {cityOpen && (
                <div className="px-4 py-4 flex flex-col gap-3 bg-white">
                    {/* Active section */}
                    <div>
                        <button
                            className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition text-left mb-2"
                            onClick={() => setActiveOpen((o) => !o)}
                        >
                            <span className="font-semibold text-gray-700 text-sm">
                                Active{" "}
                                <span className="text-gray-400 font-normal">({active.length})</span>
                            </span>
                            <span className="text-gray-400 text-xs select-none">
                                {activeOpen ? "▲" : "▼"}
                            </span>
                        </button>
                        {activeOpen && (
                            <div className="flex flex-col gap-2">
                                {active.length === 0 ? (
                                    <p className="text-gray-400 italic text-sm px-2 py-1">
                                        No active ideas for {city}.
                                    </p>
                                ) : (
                                    active.map((item) => (
                                        <DateCard
                                            key={item.id}
                                            item={item}
                                            isLoggedIn={isLoggedIn}
                                            onToggleDone={onToggleDone}
                                            onEdit={onEdit}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Done section */}
                    <div>
                        <button
                            className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition text-left mb-2"
                            onClick={() => setDoneOpen((o) => !o)}
                        >
                            <span className="font-semibold text-gray-500 text-sm">
                                Done{" "}
                                <span className="text-gray-400 font-normal">({done.length})</span>
                            </span>
                            <span className="text-gray-400 text-xs select-none">
                                {doneOpen ? "▲" : "▼"}
                            </span>
                        </button>
                        {doneOpen && (
                            <div className="flex flex-col gap-2">
                                {done.length === 0 ? (
                                    <p className="text-gray-400 italic text-sm px-2 py-1">
                                        Nothing done yet for {city}.
                                    </p>
                                ) : (
                                    done.map((item) => (
                                        <DateCard
                                            key={item.id}
                                            item={item}
                                            isLoggedIn={isLoggedIn}
                                            onToggleDone={onToggleDone}
                                            onEdit={onEdit}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function DateBucketlistPage() {
    const person = usePersonStore((s) => s.person);
    const isLoggedIn = !!person;

    const [items, setItems] = useState<DateBucketlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [newTitle, setNewTitle] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newCity, setNewCity] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetch("/api/dateBucketlist")
            .then((r) => r.json())
            .then((data) => {
                setItems(data);
                setLoading(false);
            });
    }, []);

    async function handleAdd() {
        if (!newTitle.trim() || !newCity.trim()) return;
        setAdding(true);
        const res = await fetch("/api/dateBucketlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle.trim(), description: newDesc.trim(), city: newCity.trim(), addedBy: person }),
        });
        const newItem = await res.json();
        setItems((prev) => [...prev, newItem]);
        setNewTitle("");
        setNewDesc("");
        setNewCity("");
        setAdding(false);
    }

    async function handleToggleDone(id: number, done: boolean) {
        const res = await fetch("/api/dateBucketlist", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, done }),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    }

    async function handleEdit(id: number, data: EditState) {
        const res = await fetch("/api/dateBucketlist", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, ...data }),
        });
        const updated = await res.json();
        setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    }

    const grouped = groupByCity(items);
    const cities = Object.keys(grouped).sort();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pb-16">
            <Header />
            <main className="w-full max-w-2xl flex flex-col items-center px-4">
                <h1 className="mt-8 mb-1 text-4xl font-extrabold tracking-tight text-rose-700 drop-shadow-lg">
                    Date Bucket List
                </h1>
                <p className="text-gray-400 mb-8 text-sm">All the dates we want to go on 💕</p>

                {/* Add section */}
                <div className="w-full mb-8 bg-white rounded-2xl border border-rose-100 shadow-md p-5">
                    {isLoggedIn ? (
                        <div className="flex flex-col gap-3">
                            <h2 className="font-bold text-rose-700">Add a new date idea</h2>
                            <input
                                className="border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                                placeholder="Title *"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                            />
                            <textarea
                                className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                                rows={2}
                                placeholder="Description"
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                            />
                            <input
                                className="border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 w-full"
                                placeholder="City *"
                                value={newCity}
                                onChange={(e) => setNewCity(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                            />
                            <button
                                onClick={handleAdd}
                                disabled={adding || !newTitle.trim() || !newCity.trim()}
                                className="self-end px-5 py-2 rounded-full bg-rose-500 text-white font-semibold text-sm hover:bg-rose-600 transition disabled:opacity-50"
                            >
                                {adding ? "Adding..." : "+ Add"}
                            </button>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-sm py-1">
                            <Link href="/login" className="text-rose-600 font-semibold hover:underline">
                                Log in
                            </Link>{" "}
                            to add date ideas.
                        </p>
                    )}
                </div>

                {/* City groups */}
                {loading ? (
                    <p className="text-gray-400 italic text-sm">Loading...</p>
                ) : cities.length === 0 ? (
                    <p className="text-gray-400 italic text-sm">No date ideas yet. Add the first one!</p>
                ) : (
                    <div className="w-full flex flex-col gap-4">
                        {cities.map((city) => (
                            <CityGroup
                                key={city}
                                city={city}
                                items={grouped[city]}
                                isLoggedIn={isLoggedIn}
                                onToggleDone={handleToggleDone}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
