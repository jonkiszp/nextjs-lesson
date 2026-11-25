import { readFile } from "fs/promises";
import path from "path";

export type Product = { id: string; name: string; price: number };

// Ścieżka do pliku z danymi (względem katalogu projektu)
const filePath = path.join(process.cwd(), "app", "isr", "products.json");

// Plik jest czytany przy każdym (ponownym) generowaniu strony, a nie przez `import`.
// Dzięki temu po edycji products.json i rewalidacji strona pokaże nowe dane
// bez ponownego `npm run build`.
export async function getProducts(): Promise<Product[]> {
    const json = await readFile(filePath, "utf-8");
    return JSON.parse(json) as Product[];
}

export async function getProduct(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((p) => p.id === id);
}
