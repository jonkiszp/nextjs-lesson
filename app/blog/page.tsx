import Link from "next/link";
import { getPosts } from "./posts";

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <main style={{ padding: 20 }}>
            <h1>Blog (SSG)</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
            {/* Czas wygenerowania – przy SSG nie zmienia się po odświeżeniu strony */}
            <p>Wygenerowano: {new Date().toLocaleString("pl-PL")}</p>
        </main>
    );
}
