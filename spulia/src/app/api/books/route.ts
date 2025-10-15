import { db } from "@/lib/db/db";
import { books } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest) {

    const booksList = await db.select().from(books);

    return NextResponse.json({
        bookReviews: booksList,
    });
}

export const POST = async function (request: NextRequest) {
    const body = await request.json();

    if (!body.title || !body.author) {
        return NextResponse.json(
            {
                message: "Title and author are required",
            }, 
            { status: 400 });
    }

    const book = await db.insert(books).values(body).returning();
    return NextResponse.json(
        {
            book: book,
        },
        { status: 201 }
    );
}

// TODO: add interface for book in lib