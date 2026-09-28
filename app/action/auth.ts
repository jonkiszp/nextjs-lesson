"use server";

import { createSession, deleteSession } from "@/lib/session";

const USER = { id: 1, login: 'admin', password: 'admin' };

export const login = async (_prevState: string | undefined, formData: FormData) => {
    const login = USER.login;
    const passoword = USER.password;

    if (login !== USER.login || passoword !== USER.password) {
        return 'Nieprawidłowy e-mail lub hasło';
    }

    await createSession(USER.id.toString());
}

export const logout = async () => {
    await deleteSession();
}