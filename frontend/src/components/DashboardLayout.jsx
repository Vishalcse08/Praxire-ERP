import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto max-h-screen scroll-smooth">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-slate-400 font-medium tracking-wide">
            Good Morning, <span className="text-white">Admin</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
