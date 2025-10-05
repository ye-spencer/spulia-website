import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest) {
    const days = getDaysSince(new Date(2025, 8, 7));
    return NextResponse.json(
        { days },
        { status: 200 }
    );  
}

function getDaysSince(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}