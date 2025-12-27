
import { useState } from 'react';
import * as authService from '../services/authServices'
import AuthContext from './authContext';


export const AuthProvider = ({ children }) => {
    //global authentication state
    const [token,setToken] = useState(() => localStorage.getItem('token'));
    const [user,setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    })

    

    //register
    const handleRegister = async (userData) => {
        const data = await authService.register(userData);

        if(data?.token) {
            localStorage.setItem('token', data.token);
        }

        if(data?.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        setToken(data.token ?? null);
        setUser(data.user ?? null);

        return data;
    };

    //login
    const handleLogin = async (credentials) => {
        const data = await authService.login(credentials);

        if(data?.token) {
            localStorage.setItem('token', data.token);
        }

        if(data?.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        setToken(data.token ?? null);
        setUser(data.user ?? null);

        return data;
        
    };

    //logout
    const handleLogout = async () => {
        authService.logout();
        setToken(null);
        setUser(null);
    };


    // Auto-login on app load
    // No effect needed to synchronously set loading since it's initialized from state.

    //what other components can use
    const value = {
        user,
        token,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};