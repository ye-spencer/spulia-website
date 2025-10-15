import { db } from "@/lib/db/db";
import { bookReviews } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
    // Get id and person, return book review, or if no params, return all book reviews with pagination
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const person = searchParams.get("person");

    if (id && person)
    {
        const bookReview = await db.select().from(bookReviews).where(
            and(
                eq(bookReviews.id, parseInt(id)),
                eq(bookReviews.person, person)
            )
        );

        if (bookReview.length === 0) {
            return NextResponse.json(
                { message: "Book review not found" }, 
                { status: 404 }
            );
        }
        return NextResponse.json(bookReview[0]);
    }
    else if (person) {
        const bookReview = await db.select().from(bookReviews).where(eq(bookReviews.person, person));
        return NextResponse.json(bookReview);
    }
    else {
        return NextResponse.json(
            { message: "Error: person is required" }, 
            { status: 400 }
        );
    }
}

export async function PATCH(request: Request) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const person = searchParams.get("person");

    const body = await request.json();

    if (id && person) {

        const bookReview = await db.select().from(bookReviews).where(
            and(
                eq(bookReviews.id, parseInt(id)),
                eq(bookReviews.person, person)
            )
        );

        if (bookReview.length === 0) 
        {
            const newBookReview = await db.insert(bookReviews).values({
                person: person,
                bookId: parseInt(id),
                ...body
            }).returning();
            return NextResponse.json(newBookReview[0]);
        }
        else 
        {
            const updatedBookReview = await db.update(bookReviews).set(body).where( 
                and(
                    eq(bookReviews.id, parseInt(id)),
                    eq(bookReviews.person, person)
                )
            ).returning();
            return NextResponse.json(updatedBookReview[0]);
        }

    }

    return NextResponse.json({ message: "Error: id and person are required" }, { status: 400 });
}

