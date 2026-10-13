import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { CheckCircle2, Cpu, GitFork, Share2, Sparkles, Trash2 } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearCount: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'ingestion' | 'workflow' | 'graph' | 'system';
  read: boolean;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onClearCount,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Workflow Extracted',
      description: 'System Workflow synthesized from Research_Paper.pdf (6 stages ready).',
      timestamp: '15m ago',
      type: 'workflow',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Vector Index Synchronized',
      description: 'Qdrant cluster ingested 4,820 multimodal embeddings with sub-15ms lookup.',
      timestamp: '45m ago',
      type: 'ingestion',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Conceptual Graph Linked',
      description: '12 relationship edges bound across Machine Learning and RAG Engine concepts.',
      timestamp: '2h ago',
      type: 'graph',
      read: false,
    },
    {
      id: 'notif-4',
      title: 'Observatory Health Optimal',
      description: 'All 7 architectural microservices reporting 99.98% uptime.',
      timestamp: '5h ago',
      type: 'system',
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onClearCount();
  };

  const clearAll = () => {
    setNotifications([]);
    onClearCount();
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'workflow':
        return <GitFork className="w-4 h-4 text-emerald-400" />;
      case 'ingestion':
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'graph':
        return <Share2 className="w-4 h-4 text-teal-400" />;
      case 'system':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Observatory Telemetry & Notifications"
      subtitle="Real-time event log and ingestion alerts"
      width="md"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2B26]">
          <button
            onClick={markAllAsRead}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Mark all as read
          </button>
          <button
            onClick={clearAll}
            className="text-xs text-[#8A948E] hover:text-rose-400 font-medium flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#8A948E]">
            No recent notifications.
          </div>
        ) : (
          <div className="space-y-2.5">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  item.read
                    ? 'bg-[#141C18]/60 border-[#1E2B26] text-[#8A948E]'
                    : 'bg-[#17201D] border-[#283832] text-[#F7F4EB] shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#0E1412] border border-[#1E2B26] shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#F7F4EB] truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-[#636E68] shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#8A948E] mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};
