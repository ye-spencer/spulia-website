import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Get id and person, return book review, or if no params, return all book reviews with pagination
}

export async function PATCH(request: Request) {

    // Get id, title, author, person, and other info, post it to database

    return NextResponse.json({ message: "Book review updated" });
}

