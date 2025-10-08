import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest) {
    return NextResponse.json({
        bookReviews: [
            {
                id: 1,
                title: "Book 1",
                author: "Author 1",
            },
        ],
    });
}