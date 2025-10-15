import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({
        message: "Book reviews",
    });
}

// TODO: mayhaps a lil, graphql action here?