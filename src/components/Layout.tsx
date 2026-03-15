import React, { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex items-center justify-center p-4 sm:p-6">
      <main className="w-full max-w-md mx-auto relative min-h-[600px] flex flex-col justify-between overflow-hidden sm:rounded-[2rem] sm:border sm:border-zinc-800 sm:shadow-2xl sm:bg-zinc-900/40">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-mafia-red/10 to-transparent pointer-events-none" />
        {children}
      </main>
    </div>
  );
};
