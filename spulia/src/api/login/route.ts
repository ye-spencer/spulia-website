export async function POST(request: Request) {
    const { username, password } = await request.json();
    return Response.json({ message: "Login successful" });
}