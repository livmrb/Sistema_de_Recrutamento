import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
const [token, setToken] = useState(() => { try { return localStorage.getItem('token'); } catch (e) { return null; } });
const [user, setUser] = useState(null);


useEffect(() => {
if (token) {
API.defaults.headers.common.Authorization = `Bearer ${token}`;
try { localStorage.setItem('token', token); } catch (e) {}
} else {
delete API.defaults.headers.common.Authorization;
try { localStorage.removeItem('token'); } catch (e) {}
}
}, [token]);


const signIn = async (email, password) => {
const res = await API.post('/auth/login', { email, password });
setToken(res.data.token);
return res;
};


const signOut = () => setToken(null);


return (
<AuthContext.Provider value={{ token, user, setUser, signIn, signOut }}>
{children}
</AuthContext.Provider>
);
}