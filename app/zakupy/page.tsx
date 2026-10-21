"use client";

import { useMemo, useRef, useState } from "react";

export default function Zakupy() {
    const [produkty, setProdukty] = useState(['aaa', 'bbb', 'ccc']);
    const [ilosc, setIlosc] = useState([1, 1, 1]);
    const [kupione, setKupione] = useState([false, false, false]);
    const [name, setName] = useState('');
    const [filter, setFilter] = useState('wszystkie');

    const listaProduktow = useMemo(() => {
        return produkty.map((produkt, index) => {
            return {
                id: index,
                name: produkt,
                qty: ilosc[index],
                done: kupione[index]
            }
        }).filter((item) => {
            if (filter === 'wszystkie') {
                return true;
            } else if (filter === 'do kupienia') {
                return !item.done;
            } else if (filter === 'kupione') {
                return item.done;
            }
        })
    }, [produkty, ilosc, kupione, filter]);

    const handleName = (event: any) => {
        setName(event.target.value);
    }

    const handleDodaj = (event: any) => {
        if (name !== '') {
            setProdukty([...produkty, name]);
            setIlosc([...ilosc, 1]);
            setKupione([...kupione, false]);
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
        setIlosc(ilosc.filter((ilosc, _index) => _index !== index));
        setKupione(kupione.filter((kupione, _index) => _index !== index))
    }

    const handleKupione = (index: number) => {
        setKupione(kupione.map((kupione, _index) => _index === index ? !kupione : kupione))
    }

    return (
        <>
            <select onChange={(event) => setFilter(event.target.value)}>
                <option value="wszystkie">Wszystkie</option>
                <option value="do kupienia">Do kupienia</option>
                <option value="kupione">Kupione</option>
            </select>
            <input name="product" onChange={handleName} onKeyDown={handleEnter} />
            <button onClick={handleDodaj}>Dodaj</button>
            {listaProduktow.map((produkt, index) => {
                return (
                    <div key={`lista_produktow_${produkt.id}`}>
                        <label>Kupione: </label>
                        <span>Ilość: {produkt.qty}</span>
                        <button onClick={
                            () => setIlosc(ilosc.map((ilosc, _index) =>
                                _index === produkt.id ? ilosc + 1 : ilosc))}
                        >+</button>
                        <button onClick={() => setIlosc(ilosc.map((ilosc, _index) => _index === produkt.id ? ilosc - 1 : ilosc))}>-</button>
                        <input type="checkbox"
                            name="kupione"
                            checked={produkt.done}
                            onChange={() => { handleKupione(produkt.id) }}
                        />
                        {produkt.name}
                        <br />
                        <button onClick={() => handleUsun(produkt.id)}>Usuń</button>
                    </div>
                )
            })}
        </>
    )
}