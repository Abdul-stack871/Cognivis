// Namespaced localStorage/sessionStorage manager for Cognivis
// Real User keys: cognivis:user:{userId}:{key}
// Demo keys:      cognivis:demo:{key}
// Guest:         in-memory only (no persistence)

const PREFIX = 'cognivis';

export const StorageService = {
  // Scoped key builder
  key(userId: string, resource: string): string {
    return `${PREFIX}:user:${userId}:${resource}`;
  },

  demoKey(resource: string): string {
    return `${PREFIX}:demo:${resource}`;
  },

  // Real user storage
  get<T>(userId: string, resource: string): T | null {
    try {
      const raw = localStorage.getItem(this.key(userId, resource));
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  set<T>(userId: string, resource: string, value: T): void {
    try {
      localStorage.setItem(this.key(userId, resource), JSON.stringify(value));
    } catch {
      // Storage full or unavailable
    }
  },

  remove(userId: string, resource: string): void {
    localStorage.removeItem(this.key(userId, resource));
  },

  clearUser(userId: string): void {
    const prefix = `${PREFIX}:user:${userId}:`;
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => localStorage.removeItem(k));
  },

  // Demo storage
  getDemoData<T>(resource: string): T | null {
    try {
      const raw = localStorage.getItem(this.demoKey(resource));
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },

  setDemoData<T>(resource: string, value: T): void {
    try {
      localStorage.setItem(this.demoKey(resource), JSON.stringify(value));
    } catch {}
  },

  clearAllDemo(): void {
    const prefix = `${PREFIX}:demo:`;
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => localStorage.removeItem(k));
  },

  // Session user key (for persisting auth across page refresh)
  getSession(): string | null {
    return localStorage.getItem(`${PREFIX}:session`);
  },

  setSession(sessionJson: string): void {
    localStorage.setItem(`${PREFIX}:session`, sessionJson);
  },

  clearSession(): void {
    localStorage.removeItem(`${PREFIX}:session`);
  },
};
