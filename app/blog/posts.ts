export type Post = { slug: string; title: string; content: string };

export const posts: Post[] = [
    { slug: "pierwszy", title: "Pierwszy post", content: "To jest treść pierwszego posta." },
    { slug: "drugi", title: "Drugi post", content: "SSG generuje tę stronę podczas `npm run build`." },
    { slug: "trzeci", title: "Trzeci post", content: "Gotowy plik HTML jest serwowany bez renderowania na żądanie." },
    { slug: "czwarty", title: "Czwarty post", content: "Gotowy plik HTML jest serwowany bez renderowania na żądanie." },
];

// Symulacja pobierania danych (np. fetch do API)
export async function getPosts(): Promise<Post[]> {
    return posts;
}

export async function getPost(slug: string): Promise<Post | undefined> {
    return posts.find((p) => p.slug === slug);
}

