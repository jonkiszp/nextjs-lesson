"use client"
import { useParams } from "next/navigation";

export default () => {
    const slug = useParams();
    return (
        <h1>
            Dynamiczny Post {String(slug?.slug)}
        </h1>
    );
}