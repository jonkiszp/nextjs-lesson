"use client";

import { useState } from "react";

export default function Zakupy() {
    const [produkty, setProdukty] = useState(['aaa', 'bbb', 'cccc']);

    const handleDodaj = (event: any) => {
        setProdukty([...produkty, event.target.value]);
    }

    return (
        <>
            <input name="product" />
            <button onClick={handleDodaj}>Dodaj</button>
            {produkty.map((produkt) => {
                return (
                    <div>
                        <p>{produkt}</p>
                    </div>
                )
            })}
        </>
    )
}