import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { CommandPalette } from '../components/layout/CommandPalette';
import { UploadModal } from '../components/documents/UploadModal';
import { NotificationDrawer } from '../components/layout/NotificationDrawer';
import { useDocuments } from '../hooks/useDocuments';
import { AnimatePresence, motion } from 'framer-motion';

export const AppLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const { uploadFile } = useDocuments();

  return (
    <div className="flex h-screen bg-[#0B0F0E] text-[#F7F4EB] font-sans antialiased overflow-hidden">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#070A09]/80 backdrop-blur-sm"
            />
            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-72"
            >
              <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenUpload={() => setUploadModalOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          unreadNotificationsCount={unreadNotifications}
        />

        <main className="flex-1 overflow-y-auto observatory-bg relative">
          <Outlet />
        </main>
      </div>

      {/* Global Modals and Drawers */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenUpload={() => {
          setCommandPaletteOpen(false);
          setUploadModalOpen(true);
        }}
      />

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        uploadFileService={uploadFile}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onClearCount={() => setUnreadNotifications(0)}
      />
    </div>
  );
};
