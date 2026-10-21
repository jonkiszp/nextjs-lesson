"use client";

import { useRef, useState } from "react";

export default function Zakupy() {
    const [produkty, setProdukty] = useState(['aaa', 'bbb', 'ccc']);
    const [name, setName] = useState('');

    const handleName = (event: any) => {
        setName(event.target.value);
    }

    const handleDodaj = (event: any) => {
        if (name !== '') {
            setProdukty([...produkty, name]);
            setName('');
        }
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
            <input name="product" onChange={handleName} onKeyDown={handleEnter} />
            <button onClick={handleDodaj}>Dodaj</button>
            {produkty.map((produkt, index) => {
                return (
                    <div key={`lista_produktow_${index}`}>
                        <label>Kupione: </label>
                        <input type="checkbox" name="kupione" />
                        {produkt}
                        <br />
                        <button onClick={() => handleUsun(index)}>Usuń</button>
                    </div>
                )
            })}
        </>
    )
}