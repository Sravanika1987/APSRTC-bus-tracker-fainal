import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  role: 'user' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'user' | 'admin') => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS = {
  user: { email: 'user@apsrtc.com', password: 'user123', name: 'User', role: 'user' as const },
  admin: { email: 'admin@apsrtc.com', password: 'admin123', name: 'Admin', role: 'admin' as const }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'user' | 'admin'): boolean => {
    const mockUser = MOCK_USERS[role];
    
    if (email === mockUser.email && password === mockUser.password) {
      setUser({
        email: mockUser.email,
        role: mockUser.role,
        name: mockUser.name
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
