// On-demand ISR – ręczne odświeżenie strony bez czekania na `revalidate`
// Przykład: GET http://localhost:3000/api/revalidate?path=/isr
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get("path") ?? "/isr";

    revalidatePath(path);

    return NextResponse.json({ revalidated: true, path, now: Date.now() });
}
