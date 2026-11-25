
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const currentSession = await authService.getSession();

        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
        }
      } catch (error) {
        console.error('Error recuperando sesión:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const { data: listener } = authService.onAuthStateChange(
      (_event, currentSession) => {
        if (!mounted) return;

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    initializeAuth();

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    loading,
    login: authService.login,
    register: authService.register,
    logout: authService.logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  }

  return context;
}
