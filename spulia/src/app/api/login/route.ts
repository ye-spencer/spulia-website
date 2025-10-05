import { NextRequest, NextResponse } from "next/server";

export const POST = async function (request: NextRequest) {
    return NextResponse.json({
        message: "Login successful",
    });
}   