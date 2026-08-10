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


import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Settings from './components/Settings';

const Dashboard = React.lazy(() => import("./components/Dashboard"))
const Settings = React.lazy(() => import("./components/Settings"))
const Users = React.lazy(() => import("./components/Users"))

function App() {
  const { loading, isAuthenticated } = useAuth();



  // The 3-state pattern: unknown → known-out → known-in
  if (loading) return <p>Loading...</p>;

  // if (!user) return (
  //   <Login />
  // );

  return (
    // <Suspense fallback="I am fallback">
    //   <Dashboard />
    // </Suspense>
    <BrowserRouter>
      <Suspense fallback="<p>Loading...</p>">
        <Routes>
          <Route path='/' element={isAuthenticated ? <Dashboard/> : <Login />} />
          <Route path='/settings' element={isAuthenticated ? <Settings/> : <Login />} />
          <Route path='/users' element={isAuthenticated ? <Users/> : <Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;