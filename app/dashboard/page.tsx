import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

/**
 * Główny panel po zalogowaniu użytkownika
 * @TODO: Dodać przycisk wyloguj (logout) i funkcje go obsługujące
 * 
 * @returns React.ReactNode
 */
const Dashboard = async () => {
    // Pobieranie tokena użytkownika z cookies
    const token = (await cookies()).get('session')?.value;
    // Weryfikacja tokena i pobranie sesji użytkownika
    const session = token ? await verifySession(token!) : null;

    // wejście do dashboarda bez zalogowania się wyrzuca spowrotem do root path
    if (!session) {
        redirect('/');
    }

    return (
        <>
            <div>Dashboard Me</div>
            <div>{String(session.userId)}</div>
        </>
    );
}

export default Dashboard;
