import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  updateProfile: (data: { name?: string; phone?: string }) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  const checkAdmin = (userEmail: string | undefined) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'bakemartnakuru@gmail.com';
    setIsAdmin(userEmail?.toLowerCase() === adminEmail.toLowerCase() || false);
  };

  const checkCustomer = (userEmail: string | undefined) => {
    setIsCustomer(!!userEmail && !isAdmin);
  };

  useEffect(() => {
    let mounted = true;
    const safetyTimeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 4000);

    if (!isSupabaseConfigured || !supabase) {
      console.error('Supabase is not configured. Check your .env VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      if (mounted) setLoading(false);
      return;
    }

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (mounted) {
          setSession(session);
          checkAdmin(session?.user?.email);
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      })
      .catch((err) => {
        console.error('Auth getSession error:', err);
        if (mounted) {
          setLoading(false);
          clearTimeout(safetyTimeout);
        }
      });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        checkAdmin(session?.user?.email);
        checkCustomer(session?.user?.email);
        clearTimeout(safetyTimeout);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(safetyTimeout);
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env and restart the dev server.' };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  };

  const signup = async (email: string, password: string, name: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: 'Supabase is not configured.' };
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: 'customer'
        }
      }
    });
    return { error: error ? error.message : null };
  };

  const updateProfile = async (data: { name?: string; phone?: string }) => {
    if (!isSupabaseConfigured || !supabase || !session?.user) {
      return { error: 'Not authenticated or Supabase not configured.' };
    }
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: session.user.id,
        ...data,
        updated_at: new Date().toISOString()
      });
    return { error: error ? error.message : null };
  };

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, loading, isAdmin, isCustomer, login, logout, signup, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
