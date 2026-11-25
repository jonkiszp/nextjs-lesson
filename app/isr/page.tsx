// ISR (Incremental Static Regeneration) – lista produktów z pliku products.json
import Link from "next/link";
import { getProducts } from "./data";

// Strona jest statyczna, ale Next.js wygeneruje ją ponownie w tle
// najwcześniej 10 sekund po ostatnim wygenerowaniu (przy kolejnym żądaniu).
export const revalidate = 10;

export default async function IsrPage() {
    const products = await getProducts();

    return (
        <main style={{ padding: 20 }}>
            <h1>Produkty (ISR, revalidate = 10 s)</h1>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        <Link href={`/isr/${p.id}`}>{p.name}</Link> – {p.price} zł
                    </li>
                ))}
            </ul>
            {/* Zmień cenę w products.json – po ok. 10 s (i dwóch odświeżeniach) zobaczysz nową wartość */}
            <p>Wygenerowano: {new Date().toLocaleString("pl-PL")}</p>
        </main>
    );
}
