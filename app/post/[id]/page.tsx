"use client"
import { useParams } from "next/navigation";

export default () => {
    const id = useParams();
    return (
        <h1>
            Dynamiczny Post {String(id?.id)}
        </h1>
    );
}