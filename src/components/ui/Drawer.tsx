import React, { useEffect, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  width?: 'md' | 'lg' | 'xl';
  side?: 'right' | 'left';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'lg',
  side = 'right',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  const initialOffset = side === 'right' ? { x: '100%' } : { x: '-100%' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070A09]/70 backdrop-blur-sm"
          />

          <div className={cn('fixed inset-y-0 flex max-w-full', side === 'right' ? 'right-0' : 'left-0')}>
            <motion.div
              initial={initialOffset}
              animate={{ x: 0 }}
              exit={initialOffset}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'w-screen bg-[#111715] border-l border-[#1E2B26] shadow-cinematic flex flex-col',
                widthClasses[width]
              )}
            >
              <div className="flex items-start justify-between p-6 border-b border-[#1E2B26] bg-[#0E1412]">
                <div>
                  {title && <h3 className="font-serif text-lg font-medium text-[#F7F4EB]">{title}</h3>}
                  {subtitle && <p className="text-xs text-[#8A948E] mt-1">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-[#8A948E] hover:text-[#F7F4EB] hover:bg-[#17201D] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
