import { db } from "@/lib/db/db";
import { books } from "@/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async function (request: NextRequest) {


    const booksList = await db.select().from(books);

    return NextResponse.json({
        bookReviews: booksList,
    });
}