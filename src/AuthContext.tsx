import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';


interface AuthContextType {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(() => {
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt && !isTokenExpired(storedJwt)) {
      return storedJwt;
    }
    localStorage.removeItem('jwt');
    return null;
  });

  useEffect(() => {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [jwt]);

  return (
    <AuthContext.Provider value={{ jwt, setJwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

