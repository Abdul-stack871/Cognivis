// Authentication and user types for Cognivis

export type AuthMode = 'authenticated' | 'guest' | 'demo';

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: 'free' | 'pro' | 'enterprise';
  avatarColor: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  mode: AuthMode;
  token?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isDemo: boolean;
  isLoading: boolean;
}
