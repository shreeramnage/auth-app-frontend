import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const getProfile = async () => {
        await api.get('/auth/me');
    }
    return (<div style={{ padding: 40 }}>
        <h1>Hello, Welcome, {user.email} V10</h1>
        <button onClick={logout}>Logout</button>
        <button style={{ marginLeft: "10px" }} onClick={getProfile}>Get Profile</button>
    </div>)
}