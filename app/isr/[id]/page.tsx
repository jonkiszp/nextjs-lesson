// ISR dla dynamicznej ścieżki /isr/[id]
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "../data";

// 1. Co 30 s strona może zostać wygenerowana ponownie
export const revalidate = 30;

// 2. Strony dla produktów z products.json powstają podczas `npm run build`
export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ id: p.id }));
}

// 3. Produkty dopisane do JSON-a po buildzie (np. id "4") zostaną wygenerowane
//    przy pierwszym żądaniu i od tego momentu też będą serwowane z cache
//    (w przeciwieństwie do SSG z dynamicParams = false)
export const dynamicParams = true;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) notFound();

    return (
        <main style={{ padding: 20 }}>
            <h1>{product.name}</h1>
            <p>Cena: {product.price} zł</p>
            <p>Wygenerowano: {new Date().toLocaleString("pl-PL")}</p>
        </main>
    );
}
