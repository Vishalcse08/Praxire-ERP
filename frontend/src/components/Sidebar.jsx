import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Settings, 
  LogOut, 
  Briefcase, 
  GraduationCap,
  TrendingUp,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const employeeLinks = [
    { to: '/employee', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employee/profile', icon: User, label: 'Personal Details' },
    { to: '/employee/education', icon: GraduationCap, label: 'Education & Skills' },
    { to: '/employee/documents', icon: FileText, label: 'ID Proofs' },
  ];

  const founderLinks = [
    { to: '/founder', icon: TrendingUp, label: 'Revenue & Targets' },
    { to: '/founder/employees', icon: Users, label: 'Employee Monitor' },
    { to: '/founder/settings', icon: Settings, label: 'Company Settings' },
  ];

  const links = user?.role === 'founder' ? founderLinks : employeeLinks;

  return (
    <aside className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 h-screen flex flex-col sticky top-0 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">P</div>
          <span className="text-xl font-bold text-white tracking-tight">Praxire <span className="text-blue-500">ERP</span></span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Main Menu</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
              ${isActive 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }
            `}
          >
            <link.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
