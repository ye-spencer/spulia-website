"use client";

import Header from "@/components/header";
import { getPlaylists } from "./actions";
import { useEffect, useState } from "react";

interface Playlist {
    id: number;
    src: string;
}

export default function Music() {

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        async function fetchPlaylists() {
            const playlists = await getPlaylists();
            setPlaylists(playlists);
        }
        fetchPlaylists();
    }, []);

    return (
        <div>
            <Header />  
            <h1 className="text-4xl font-extrabold text-center text-green-700 mt-8 mb-4 drop-shadow-lg tracking-tight">
                Music <span role="img" aria-label="music">🎶</span>
            </h1>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {playlists.map((playlist) => (
                    <iframe
                        key={playlist.id}
                        data-testid="embed-iframe"
                        className="rounded-lg mb-8"
                        src={playlist.src}
                        width="60%"
                        height="425"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                ))}
            </div>
        </div>
    );
}