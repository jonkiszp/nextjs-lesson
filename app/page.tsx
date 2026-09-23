"use client";
import { useCallback, useEffect, useState } from "react";

export default () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const submitCal = useCallback((event: any) => {
        event.preventDefault();
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "login": login, "password": password })
        }).then(res => res.json()).then(data => {
            console.log(data);
        });
        return false;
    }, [login, password]);

    return (
        <form onSubmit={submitCal}>
            <input onChange={(e) => setLogin(e.target.value)} type="text" placeholder="Login" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Hasło" />
            <input type="submit" value="Wyślij" />
        </form>
    );
}