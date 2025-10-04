export async function GET(request: Request) {
    const days = getDaysSince(new Date(2025, 8, 7));
    return Response.json(
        { days },
        { status: 200 }
    );  
}

function getDaysSince(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}