import { db } from "@/lib/db/db";
import { dateBucketlist } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
    const items = await db.select().from(dateBucketlist).orderBy(dateBucketlist.createdAt);
    return NextResponse.json(items);
}

export async function POST(request: Request) {
    const body = await request.json();
    const { title, description, city, addedBy } = body;

    if (!title || !city || !addedBy) {
        return NextResponse.json({ message: "title, city, and addedBy are required" }, { status: 400 });
    }

    const newItem = await db.insert(dateBucketlist).values({
        title,
        description: description || "",
        city,
        addedBy,
        done: false,
    }).returning();

    return NextResponse.json(newItem[0]);
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
        return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const updated = await db.update(dateBucketlist).set(fields).where(eq(dateBucketlist.id, id)).returning();
    return NextResponse.json(updated[0]);
}
