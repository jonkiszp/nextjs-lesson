import { verifySession } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
    const token = (await cookies()).get('session')?.value;
    const session = token ? await verifySession(token!) : null;

    if (!session) {
        redirect('/');
    }

    return (
        <>
            <div>Dashboard</div>
            <div>{String(session.userId)}</div>
        </>
    );
}

export default Dashboard;
