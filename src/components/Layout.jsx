import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
    return <div style={{display: "flex"}}>
        <aside style={{maxWidth: "300px"}}>
            <NavLink style={{display: "block"}} to={"/"}>Dashboard</NavLink>
            <NavLink style={{display: "block"}} to={"/users"}>Users</NavLink>
            <NavLink style={{display: "block"}} to={"/settings"}>Settings</NavLink>
        </aside>
        <main style={{flex: 1}}>
            <Outlet />
        </main>
    </div>
}

export default Layout