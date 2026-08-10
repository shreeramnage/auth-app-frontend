import { api } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import batsy from "../assets/batsy.jpg";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const getProfile = async () => {
        await api.get('/auth/me');
    }
    return (<div style={{ padding: 40 }}>
        <Link to={"/settings"} >Settings</Link>
        <Link to={"/users"}>Users</Link>
        <img src={batsy} alt="batman" width={"300"} height={"300"} />
        <h1>Hello, Welcome, {user.email} V10</h1>
        {/* <button onClick={logout}>Logout</button> */}
        <button style={{ marginLeft: "10px" }} onClick={getProfile}>Get Profile</button>
    </div>)
}