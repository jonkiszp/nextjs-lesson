"use client"
import { useParams } from "next/navigation";

// [...slug] => /aaa/bb/ccc -> ["aaa", "bb", "ccc"]
export default () => {
    const slug = useParams();
    return (
        <h1>
            Dynamiczny Post {String(slug?.slug)}
        </h1>
    );
}