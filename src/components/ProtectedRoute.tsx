import React from 'react';
import { useAuth } from '../components/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF3E7]">
        <p className="text-[#000000]">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};
