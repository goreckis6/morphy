import { createClient, Session, User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type AuthCallback = (event: string, session: Session | null) => void;

const createMockSession = (user: User): Session => {
  const now = Math.floor(Date.now() / 1000);
  return {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: now + 3600,
    provider_token: null,
    provider_refresh_token: null,
    user,
  } as Session;
};

const createMockUser = (email: string, metadata?: Record<string, any>): User => {
  return {
    id: crypto.randomUUID(),
    aud: 'authenticated',
    email,
    created_at: new Date().toISOString(),
    user_metadata: metadata ?? {},
    app_metadata: {},
    identities: [],
    last_sign_in_at: new Date().toISOString(),
    phone: '',
    role: 'authenticated',
  } as unknown as User;
};

const MOCK_USERS_KEY = 'morphy_mock_users';
const MOCK_SESSION_KEY = 'morphy_mock_session';

const loadMockUsers = (): Record<string, { password: string; metadata?: Record<string, any> }> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(MOCK_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.warn('Failed to load mock users:', error);
    return {};
  }
};

const saveMockUsers = (users: Record<string, { password: string; metadata?: Record<string, any> }>) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

const loadMockSession = (): Session | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(MOCK_SESSION_KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch (error) {
    console.warn('Failed to load mock session:', error);
    return null;
  }
};

const saveMockSession = (session: Session | null) => {
  if (typeof window === 'undefined') return;
  if (!session) {
    window.localStorage.removeItem(MOCK_SESSION_KEY);
  } else {
    window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));
  }
};

const createMockSupabase = () => {
  let listeners: AuthCallback[] = [];

  const notify = (event: string, session: Session | null) => {
    listeners.forEach((callback) => {
      try {
        callback(event, session);
      } catch (error) {
        console.warn('Auth listener error:', error);
      }
    });
  };

  return {
    auth: {
      getSession: async () => {
        const session = loadMockSession();
        return { data: { session }, error: null };
      },
      onAuthStateChange: (callback: AuthCallback) => {
        listeners.push(callback);
        const subscription = {
          unsubscribe: () => {
            listeners = listeners.filter((listener) => listener !== callback);
          },
        };
        return { data: { subscription }, error: null };
      },
      signUp: async ({ email, password, options }: { email: string; password: string; options?: { data?: Record<string, any> } }) => {
        const users = loadMockUsers();
        if (users[email]) {
          return { data: { user: null, session: null }, error: { message: 'User already exists' } };
        }

        users[email] = { password, metadata: options?.data };
        saveMockUsers(users);

        const user = createMockUser(email, options?.data);
        const session = createMockSession(user);
        saveMockSession(session);
        notify('SIGNED_IN', session);

        return { data: { user, session }, error: null };
      },
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        const users = loadMockUsers();
        const stored = users[email];
        if (!stored || stored.password !== password) {
          return { data: { user: null, session: null }, error: { message: 'Invalid email or password' } };
        }

        const user = createMockUser(email, stored.metadata);
        const session = createMockSession(user);
        saveMockSession(session);
        notify('SIGNED_IN', session);

        return { data: { user, session }, error: null };
      },
      signOut: async () => {
        saveMockSession(null);
        notify('SIGNED_OUT', null);
        return { error: null };
      },
      resetPasswordForEmail: async (email: string) => {
        const users = loadMockUsers();
        if (!users[email]) {
          return { data: null, error: { message: 'User not found' } };
        }
        return { data: { message: 'Password reset email sent (mock).' }, error: null };
      },
    },
  };
};

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : createMockSupabase();

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables not found. Falling back to local mock authentication.');
}

// Database types (kept for compatibility)
export interface Database {
  public: {
    Tables: {
      user_activities: {
        Row: {
          id: string;
          user_id: string;
          activity_type: string;
          input_format: string;
          output_format: string;
          file_size: number;
          success: boolean;
          timestamp: string;
        };
        Insert: {
          user_id: string;
          activity_type: string;
          input_format: string;
          output_format: string;
          file_size: number;
          success: boolean;
        };
        Update: {
          activity_type?: string;
          input_format?: string;
          output_format?: string;
          file_size?: number;
          success?: boolean;
        };
      };
      shared_files: {
        Row: {
          id: string;
          file_id: string;
          user_id: string;
          original_filename: string;
          file_type: string;
          file_size: number;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          file_id: string;
          user_id: string;
          original_filename: string;
          file_type: string;
          file_size: number;
          expires_at: string;
        };
        Update: {
          expires_at?: string;
        };
      };
    };
  };
}