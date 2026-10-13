import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Command,
} from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu: () => void;
  onOpenCommandPalette: () => void;
  onOpenUpload: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileMenu,
  onOpenCommandPalette,
  onOpenNotifications,
  unreadNotificationsCount = 3,
}) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-[#0D1210]/90 backdrop-blur-md border-b border-[#1C2520] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left: Mobile trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-[#8A948E] hover:text-[#F7F4EB] hover:bg-[#131A17] lg:hidden transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Center: Wide Global Search input matching reference */}
      <div className="flex-1 max-w-xl mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-[#141C18] border border-[#233129] hover:border-[#33463B] text-xs text-[#8A948E] hover:text-[#D5D1C5] transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="w-3.5 h-3.5 text-[#6A7870] group-hover:text-emerald-400 transition-colors shrink-0" />
            <span className="truncate">Search documents, topics, or ask anything...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono bg-[#1E2B25] text-[#D5D1C5] rounded border border-[#283832]">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>
      </div>

      {/* Right Side: Date, Notification Bell, Theme & Avatar matching reference */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <span className="hidden md:inline text-xs font-mono text-[#8A948E]">
          Tue, 15 Apr 2025
        </span>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl bg-[#141C18] border border-[#233129] text-[#8A948E] hover:text-[#F7F4EB] hover:border-[#33463B] transition-colors"
          aria-label="View Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[#070A09] text-[9px] font-mono font-bold flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Profile Avatar AK */}
        <button
          onClick={() => navigate('/settings')}
          className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs flex items-center justify-center shadow-md transition-transform hover:scale-105"
          title="Arun Kumar - Settings"
        >
          AK
        </button>
      </div>
    </header>
  );
};
