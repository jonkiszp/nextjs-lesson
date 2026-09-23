
export async function POST(request: Request) {
    const data = await request.json();
    const { login, password } = data;
    if (login === "admin" && password === "admin") {
        return Response.json({ message: "Zalogowano" });
    }
    return Response.json({ message: "Nie zalogowano" });
}