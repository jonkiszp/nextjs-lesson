"use client";

import { useCallback, useEffect, useState } from "react";

export default function Licznik() {
    const [licznik, setLicznik] = useState(0);
    const [krok, setKrok] = useState(1);
    const [disabled, setDisabled] = useState(false);

    // useEffect(() => {
    //     if (licznik < 0) {
    //         setLicznik(0);
    //     }
    // }, [licznik]);

    const handleDecrement = useCallback(() => {
        if (licznik > 0) {
            setLicznik(licznik - krok);
        }
        if (licznik <= 0) {
            setDisabled(true);
        }
    }, [licznik, krok]);

    const handleIncrement = useCallback(() => {
        setLicznik(licznik + krok);
        setDisabled(false);
    }, [licznik, krok]);

    const handleReset = () => {
        setLicznik(0);
        setDisabled(false);
    }

    return (
        <>
            <h1>{licznik}</h1>
            <input type="number" step={krok} onChange={(e) => {setKrok(Number(e.target.value))}} defaultValue={krok} />
            <button disabled={disabled} onClick={handleDecrement}>-{krok}</button>
            <button onClick={handleIncrement}>+{krok}</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={() => setKrok(k => k + 3)}>+3</button>
        </>
    )
}