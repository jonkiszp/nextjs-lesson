"use client";

import { useState } from "react";

export default function Zakupy() {
    const [produkty, setProdukty] = useState(['aaa', 'bbb', 'ccc']);

    const handleDodaj = (event: any) => {
        if (event.target.value == '') { 
            return;
        }
        setProdukty([...produkty, event.target.value]);
    }

    const handleEnter = (event: any) => {
        if (event.key === 'Enter') {
            handleDodaj(event);
        }
    }

    const handleUsun = (index: number) => {
        setProdukty(produkty.filter((produkt, _index) => _index !== index));
    }

    return (
        <>
            <input name="product" onKeyDown={handleEnter} />
            <button onClick={handleDodaj}>Dodaj</button>
            {produkty.map((produkt, index) => {
                return (
                    <div key={`lista_produktow_${index}`}>
                        <p>{produkt}</p>
                        <button onClick={() => handleUsun(index)}>Usuń</button>
                    </div>
                )
            })}
        </>
    )
}