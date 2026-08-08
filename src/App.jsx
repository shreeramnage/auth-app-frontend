// import { api, setAccessToken } from './api/axios';

// function App() {
//   const testLogin = async () => {
//     // 1. Login → access token in JSON, refresh token in cookie (automatic)
//     const { data } = await api.post('/auth/login', {
//       email: 'demo@test.com',
//       password: 'secret123',
//     });

//     // 2. Keep access token in memory
//     setAccessToken(data.accessToken);
//     console.log('Access token stored in memory ✓');

//     // 3. Call protected route — interceptor attaches the token
//     const me = await api.get('/auth/me');
//     console.log('Protected /me response:', me.data);
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Auth Test</h1>
//       <button onClick={testLogin}>Test login</button>
//       <button onClick={async () => {
//         const me = await api.get('/auth/me');
//         console.log('me:', me.data);
//       }}>Call /me</button>
//     </div>
//   );
// }

// export default App;


import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { api } from './api/axios';

function App() {
  const { user, loading, login, logout } = useAuth();
  const [email, setEmail] = useState('demo@test.com');
  const [password, setPassword] = useState('secret123');

  const getProfile = async () => {
    await api.get('/auth/me');
  }

  // The 3-state pattern: unknown → known-out → known-in
  if (loading) return <p>Loading...</p>;

  if (!user) return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => login(email, password)}>Login</button>
    </div>
  );

  return (
    <div style={{ padding: 40 }}>
      <h1>Hello, Welcome, {user.email} V6</h1>
      <button onClick={logout}>Logout</button>
      <button style={{marginLeft: "10px"}} onClick={getProfile}>Get Profile</button>
    </div>
  );
}

export default App;