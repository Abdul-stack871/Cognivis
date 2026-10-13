import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Files,
  MessageSquare,
  GitFork,
  Network,
  Share2,
  BarChart2,
  BookOpen,
  Settings,
  Sun,
  Moon,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { CognivisLogo } from '../common/CognivisLogo';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Documents', path: '/documents', icon: Files },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Workflow Studio', path: '/workflows', icon: GitFork },
    { name: 'Architecture Studio', path: '/architecture', icon: Network },
    { name: 'Knowledge Graph', path: '/knowledge-graph', icon: Share2 },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Notebook', path: '/notebook', icon: BookOpen },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0D1210] border-r border-[#1C2520] flex flex-col justify-between select-none z-30 shrink-0">
      {/* Brand Header */}
      <div className="p-5 pb-3">
        <NavLink to="/home" onClick={onCloseMobile} className="block group">
          <CognivisLogo size={32} showText={true} />
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path === '/home' && (location.pathname === '/' || location.pathname === '/home'));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#18231E] text-[#F7F4EB] shadow-sm border border-[#2A3B33]'
                  : 'text-[#8A948E] hover:text-[#EDE8DC] hover:bg-[#131A17]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-emerald-400'
                      : 'text-[#6A7870] group-hover:text-[#D5D1C5]'
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Atmospheric Glowing Orb Card + Theme Toggle & User Profile */}
      <div className="p-3.5 space-y-3 border-t border-[#1C2520] bg-[#0A0E0C]">
        {/* Curiosity Connects Everything Card */}
        <div
          onClick={() => navigate('/knowledge-graph')}
          className="relative overflow-hidden rounded-2xl p-3 bg-gradient-to-b from-[#131B17] to-[#0D1210] border border-[#233129] cursor-pointer group hover:border-emerald-500/40 transition-all shadow-lg"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-serif text-xs font-medium text-[#EDE8DC] italic">
              "Curiosity Connects Everything."
            </span>
          </div>

          <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2 border border-[#2A3B33]/60 bg-[#070A09]">
            <img
              src="/images/curiosity-orb.jpg"
              alt="Curiosity Orb"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1210] via-transparent to-transparent opacity-60" />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 group-hover:text-emerald-300">
            <span>Explore Knowledge</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Theme Toggle (Sun / Moon) */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#131A17] border border-[#233129] text-xs">
          <span className="text-[#8A948E] text-[11px] font-mono">Theme Mode</span>
          <div className="flex items-center gap-1 bg-[#0A0E0C] p-0.5 rounded-lg border border-[#1C2520]">
            <button
              onClick={() => setIsDarkMode(false)}
              className={`p-1 rounded-md transition-colors ${
                !isDarkMode ? 'bg-[#1F2B25] text-amber-300' : 'text-[#6A7870] hover:text-[#EDE8DC]'
              }`}
              title="Light"
            >
              <Sun className="w-3 h-3" />
            </button>
            <button
              onClick={() => setIsDarkMode(true)}
              className={`p-1 rounded-md transition-colors ${
                isDarkMode ? 'bg-[#1F2B25] text-emerald-400' : 'text-[#6A7870] hover:text-[#EDE8DC]'
              }`}
              title="Dark"
            >
              <Moon className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* User Profile Pill */}
        <div
          onClick={() => navigate('/settings')}
          className="flex items-center justify-between p-2 rounded-xl bg-[#131A17] border border-[#233129] hover:border-[#2F4238] transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            {/* Blue AK circle avatar from reference image */}
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md">
              AK
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-[#F7F4EB] leading-tight group-hover:text-emerald-300 transition-colors">
                Arun Kumar
              </span>
              <span className="text-[10px] font-mono text-[#8A948E] leading-none mt-0.5">
                Free Plan
              </span>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#6A7870] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </aside>
  );
};
