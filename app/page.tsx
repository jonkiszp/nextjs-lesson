"use client";
import { useActionState, useCallback, useEffect, useState } from "react";
import { login } from "./action/auth";

export default () => {
    // const [login, setLogin] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    const [error, formAction, pending] = useActionState(login, undefined);

    return (
        <form action={formAction}>
            <input name="login" type="text" placeholder="Login" />
            <input name="password" type="password" placeholder="Hasło" />
            <button disabled={pending} type="submit">Wyślij</button>
            {error && <span>{error}</span>}
        </form>
    );
}