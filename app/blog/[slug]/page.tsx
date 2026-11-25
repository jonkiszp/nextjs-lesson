// SSG dla dynamicznej ścieżki /blog/[slug]
import { notFound } from "next/navigation";
import { getPost, getPosts } from "../posts";

// 1. Mówimy Next.js, które strony ma wygenerować podczas `npm run build`
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

// 2. Slugi spoza listy zwracają 404 (bez renderowania na żądanie)
export const dynamicParams = false;

// 3. W Next.js 15+ params jest Promise
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) notFound();

    return (
        <main style={{ padding: 20 }}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Wygenerowano: {new Date().toLocaleString("pl-PL")}</p>
        </main>
    );
}
