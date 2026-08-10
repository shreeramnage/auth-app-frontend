import { NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Layout = () => {
    const { logout } = useAuth()
    return <div style={{display: "flex"}}>
        <aside style={{maxWidth: "300px"}}>
            <NavLink style={{display: "block"}} to={"/"}>Dashboard</NavLink>
            <NavLink style={{display: "block"}} to={"/users"}>Users</NavLink>
            <NavLink style={{display: "block"}} to={"/settings"}>Settings</NavLink>

            <button onClick={logout}>Logout</button>
        </aside>
        <main style={{flex: 1}}>
            <Outlet />
        </main>
    </div>
}

export default Layout