import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();
const LoginContext = createContext();
const LogoutContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function useLogin() {
    return useContext(LoginContext);
}

export function useLogout() {
    return useContext(LogoutContext);
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const user = localStorage.getItem('user');
            if (user) {
                setUser(user);
            }
        };
        checkAuth();
    }, []);

    const login = async (userName) => {
        try {
            const response = await axios.get(`http://localhost:5000/users?username=${userName}`);
            const user = response.data[0];

            if (user) {
                // Destructure the user object to exclude the website field
            const { website, ...userWithoutWebsite } = user;
            
            // Save the modified user object to localStorage and update the state
            localStorage.setItem('user', JSON.stringify(userWithoutWebsite));
            setUser(userWithoutWebsite);
                navigate(`/users/${user.id}/home`);
            } else {
                alert('Unauthorized user.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };


    return (
        <UserContext.Provider value={user}>
        <LoginContext.Provider value={login}>
            <LogoutContext.Provider value={logout}>
                {children}
            </LogoutContext.Provider>
        </LoginContext.Provider>
    </UserContext.Provider>
    );
};

export default AuthProvider;
