import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest) {
    return NextResponse.json(
        {
            playlists: [
                {
                    id: 1,
                    src: "https://open.spotify.com/embed/playlist/7EtmJ3JGtkRKNGaD0o0p2V?utm_source=generator",
                },
            ],
        },
        { status: 200 },
    );
}

// TODO: turn into db for overengineering