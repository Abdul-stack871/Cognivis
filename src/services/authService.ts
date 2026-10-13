import { AuthSession, AuthMode, SignInPayload, SignUpPayload, User } from '../types/auth';
import { StorageService } from './storageService';

const DEMO_USER: User = {
  id: 'demo-user',
  name: 'Cognivis Demo',
  email: 'demo@cognivis.ai',
  initials: 'CD',
  plan: 'pro',
  avatarColor: 'bg-emerald-600',
  createdAt: new Date().toISOString(),
};

const GUEST_USER: User = {
  id: 'guest',
  name: 'Guest User',
  email: '',
  initials: 'GU',
  plan: 'free',
  avatarColor: 'bg-slate-600',
  createdAt: new Date().toISOString(),
};

function buildInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Colors pool for registered users
const AVATAR_COLORS = [
  'bg-violet-600', 'bg-blue-600', 'bg-cyan-600',
  'bg-teal-600', 'bg-indigo-600', 'bg-rose-600',
];

function pickAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export const authService = {
  /**
   * Retrieve session from persisted storage.
   */
  restoreSession(): AuthSession | null {
    const raw = StorageService.getSession();
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  },

  /**
   * Sign in with email + password (mock implementation).
   * Structure allows real backend replacement later.
   */
  async signIn(payload: SignInPayload): Promise<AuthSession> {
    // Simulate API latency
    await new Promise((r) => setTimeout(r, 600));

    if (!payload.email || !payload.password) {
      throw new Error('Email and password are required.');
    }

    if (payload.password.length < 6) {
      throw new Error('Invalid credentials. Please try again.');
    }

    const userId = `user-${btoa(payload.email).replace(/=/g, '').slice(0, 10)}`;
    const storedName = StorageService.get<string>(userId, 'name') || payload.email.split('@')[0];

    const user: User = {
      id: userId,
      name: storedName,
      email: payload.email,
      initials: buildInitials(storedName),
      plan: 'free',
      avatarColor: pickAvatarColor(payload.email),
      createdAt: new Date().toISOString(),
    };

    const session: AuthSession = {
      user,
      mode: 'authenticated',
      token: `mock-token-${Date.now()}`,
    };

    StorageService.setSession(JSON.stringify(session));
    return session;
  },

  /**
   * Register a new user (mock implementation).
   */
  async signUp(payload: SignUpPayload): Promise<AuthSession> {
    await new Promise((r) => setTimeout(r, 700));

    if (!payload.name.trim()) throw new Error('Name is required.');
    if (!payload.email.includes('@')) throw new Error('Please enter a valid email address.');
    if (payload.password.length < 6) throw new Error('Password must be at least 6 characters.');
    if (payload.password !== payload.confirmPassword) throw new Error('Passwords do not match.');

    const userId = `user-${btoa(payload.email).replace(/=/g, '').slice(0, 10)}`;

    const user: User = {
      id: userId,
      name: payload.name.trim(),
      email: payload.email,
      initials: buildInitials(payload.name.trim()),
      plan: 'free',
      avatarColor: pickAvatarColor(payload.email),
      createdAt: new Date().toISOString(),
    };

    StorageService.set(userId, 'name', payload.name.trim());

    const session: AuthSession = {
      user,
      mode: 'authenticated',
      token: `mock-token-${Date.now()}`,
    };

    StorageService.setSession(JSON.stringify(session));
    return session;
  },

  /**
   * Continue as guest — in-memory session only.
   */
  continueAsGuest(): AuthSession {
    return { user: GUEST_USER, mode: 'guest' };
  },

  /**
   * Start Demo Mode — loads a demo session (not persisted to user data).
   */
  startDemoMode(): AuthSession {
    return { user: DEMO_USER, mode: 'demo' };
  },

  /**
   * Exit Demo Mode — returns to guest state and clears demo storage.
   */
  exitDemoMode(): void {
    StorageService.clearAllDemo();
  },

  /**
   * Sign out the current user.
   */
  signOut(): void {
    StorageService.clearSession();
  },
};
