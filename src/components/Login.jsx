import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    
      const { login } = useAuth();
      const [email, setEmail] = useState('demo@test.com');
      const [password, setPassword] = useState('secret123');
    return (<div style={{ padding: 40 }}>
        <h1>Login</h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => login(email, password)}>Login</button>
    </div>)
}

export default Login