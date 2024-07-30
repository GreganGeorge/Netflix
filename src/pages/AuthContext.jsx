import React, { createContext, useState, useContext } from 'react';
import { useNavigate} from "react-router-dom"
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children ,isAuthenticated}) => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(isAuthenticated);
    const login = () => {
      setLoggedIn(true);
      navigate('/login');
    };
  
    const logout = () => {
      setLoggedIn(false);
      localStorage.removeItem('isAuthenticated');
      navigate('/');
    };
  
    return (
      <AuthContext.Provider value={{ loggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;
