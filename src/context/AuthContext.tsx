import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthSession, AuthMode, AuthState, SignInPayload, SignUpPayload } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextValue extends AuthState {
  signIn: (payload: SignInPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  continueAsGuest: () => void;
  startDemoMode: () => void;
  exitDemoMode: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore persisted session on mount
  useEffect(() => {
    const restored = authService.restoreSession();
    if (restored && restored.mode === 'authenticated') {
      setSession(restored);
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (payload: SignInPayload) => {
    const s = await authService.signIn(payload);
    setSession(s);
  }, []);

  const signUp = useCallback(async (payload: SignUpPayload) => {
    const s = await authService.signUp(payload);
    setSession(s);
  }, []);

  const continueAsGuest = useCallback(() => {
    setSession(authService.continueAsGuest());
  }, []);

  const startDemoMode = useCallback(() => {
    setSession(authService.startDemoMode());
  }, []);

  const exitDemoMode = useCallback(() => {
    authService.exitDemoMode();
    setSession(authService.continueAsGuest());
  }, []);

  const signOut = useCallback(() => {
    authService.signOut();
    setSession(null);
  }, []);

  const mode: AuthMode = session?.mode ?? 'guest';

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: mode === 'authenticated',
        isGuest: mode === 'guest' || session === null,
        isDemo: mode === 'demo',
        isLoading,
        signIn,
        signUp,
        continueAsGuest,
        startDemoMode,
        exitDemoMode,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
