import { createContext, useContext, useEffect, useState } from 'react';
import { api, setAccessToken } from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true); // true until we KNOW the answer

  // Runs ONCE on app boot — the session restore attempt
  useEffect(() => {
    const restore = async () => {
      try {
        // Cookie rides along automatically; if valid → new tokens
        const { data } = await api.post('/auth/refresh');
        setAccessToken(data.accessToken);
        const me = await api.get('/auth/me');
        setUser(me.data);
        setIsAuthenticated(true)
      } catch {
        // No cookie / expired / nuked → not logged in. Perfectly normal.
      } finally {
        setLoading(false); // either way, we now KNOW
      }
    };
    restore();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setAccessToken(data.accessToken);
    const me = await api.get('/auth/me');
    setIsAuthenticated(true)
    setUser(me.data);
  };

  const logout = async () => {
    await api.post('/auth/logout');  // revoke family + clear cookie
    setAccessToken(null);            // wipe memory
    setUser(null);      
    setIsAuthenticated(false)             // UI flips to logged-out
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);