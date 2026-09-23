"use client";
import { useCallback, useEffect, useState } from "react";

export default () => {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const submitCal = useCallback((event: any) => {
        event.preventDefault();
        console.log(login, password);
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