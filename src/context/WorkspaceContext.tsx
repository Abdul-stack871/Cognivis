import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { DocumentItem } from '../types/document';
import { StorageService } from '../services/storageService';
import { useAuth } from './AuthContext';

// Demo Documents (preloaded when entering Demo Mode)
const DEMO_DOCUMENTS: DocumentItem[] = [
  {
    id: 'demo-doc-1',
    name: 'Research_Paper.pdf',
    type: 'pdf',
    size: 4404000,
    pageCount: 42,
    status: 'ready',
    progress: 100,
    uploadedAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    summary: 'Multimodal Topological RAG Specification covering architecture, retrieval, and evaluation.',
    sections: [{ id: 'ds1-1', pageNumber: 1, title: 'Abstract', snippet: 'Topological parsing of multimodal documents.' }],
    tags: ['Architecture', 'Topology', 'Neural'],
    metadata: { readingTimeMinutes: 18, wordCount: 12600, embeddingDimensions: 1536 },
  },
  {
    id: 'demo-doc-2',
    name: 'System_Design.docx',
    type: 'docx',
    size: 1887000,
    pageCount: 18,
    status: 'ready',
    progress: 100,
    uploadedAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    summary: 'System Design & Distributed Ingestion pipeline specification.',
    sections: [{ id: 'ds2-1', pageNumber: 1, title: 'Ingestion Layer', snippet: 'High-throughput async document streaming.' }],
    tags: ['Infrastructure', 'Ingestion'],
    metadata: { readingTimeMinutes: 8, wordCount: 5400, embeddingDimensions: 1536 },
  },
  {
    id: 'demo-doc-3',
    name: 'Dataset_Description.xlsx',
    type: 'xlsx',
    size: 892000,
    pageCount: 12,
    status: 'ready',
    progress: 100,
    uploadedAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    summary: 'Annotated benchmark datasets for evaluation.',
    sections: [{ id: 'ds3-1', pageNumber: 1, title: 'Datasets', snippet: 'MMQA benchmark annotations.' }],
    tags: ['Dataset', 'Benchmark'],
    metadata: { readingTimeMinutes: 5, wordCount: 2100, embeddingDimensions: 1536 },
  },
  {
    id: 'demo-doc-4',
    name: 'Architecture_Diagram.png',
    type: 'image',
    size: 1240000,
    pageCount: 1,
    status: 'ready',
    progress: 100,
    uploadedAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    summary: 'System architecture visualization for Cognivis.',
    sections: [{ id: 'ds4-1', pageNumber: 1, title: 'Architecture Overview', snippet: 'Full stack visual diagram.' }],
    tags: ['Diagram', 'Architecture'],
    metadata: { readingTimeMinutes: 1, wordCount: 0, embeddingDimensions: 1536 },
  },
];

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface WorkspaceState {
  documents: DocumentItem[];
  chatCount: number;
  notifications: Notification[];
}

interface WorkspaceContextValue {
  documents: DocumentItem[];
  chatCount: number;
  notifications: Notification[];
  unreadNotificationCount: number;
  addDocument: (doc: DocumentItem) => void;
  removeDocument: (id: string) => void;
  updateDocument: (doc: DocumentItem) => void;
  incrementChatCount: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAllNotificationsRead: () => void;
  clearWorkspace: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export const WorkspaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { session, isDemo } = useAuth();

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [chatCount, setChatCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const userId = session?.user.id ?? 'guest';

  // Load workspace from storage when session changes
  useEffect(() => {
    if (isDemo) {
      // Load demo data
      const savedDemoDocs = StorageService.getDemoData<DocumentItem[]>('documents');
      setDocuments(savedDemoDocs ?? DEMO_DOCUMENTS);
      setChatCount(StorageService.getDemoData<number>('chatCount') ?? 8);
      setNotifications([{
        id: 'demo-notif-1',
        type: 'success',
        title: 'Demo Mode Active',
        message: 'You are exploring Cognivis with demo data. Click "Exit Demo" to return to a clean workspace.',
        timestamp: new Date().toISOString(),
        read: false,
      }]);
    } else if (userId !== 'guest') {
      // Load real user data
      setDocuments(StorageService.get<DocumentItem[]>(userId, 'documents') ?? []);
      setChatCount(StorageService.get<number>(userId, 'chatCount') ?? 0);
      setNotifications(StorageService.get<Notification[]>(userId, 'notifications') ?? []);
    } else {
      // Guest mode - start empty (in-memory only)
      setDocuments([]);
      setChatCount(0);
      setNotifications([]);
    }
  }, [userId, isDemo]);

  // Persist changes to storage
  const persistDocuments = useCallback((docs: DocumentItem[]) => {
    if (isDemo) StorageService.setDemoData('documents', docs);
    else if (userId !== 'guest') StorageService.set(userId, 'documents', docs);
  }, [userId, isDemo]);

  const persistChatCount = useCallback((count: number) => {
    if (isDemo) StorageService.setDemoData('chatCount', count);
    else if (userId !== 'guest') StorageService.set(userId, 'chatCount', count);
  }, [userId, isDemo]);

  const persistNotifications = useCallback((notifs: Notification[]) => {
    if (!isDemo && userId !== 'guest') StorageService.set(userId, 'notifications', notifs);
  }, [userId, isDemo]);

  const addDocument = useCallback((doc: DocumentItem) => {
    setDocuments((prev) => {
      const updated = [doc, ...prev.filter((d) => d.id !== doc.id)];
      persistDocuments(updated);
      return updated;
    });
  }, [persistDocuments]);

  const removeDocument = useCallback((id: string) => {
    setDocuments((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      persistDocuments(updated);
      return updated;
    });
  }, [persistDocuments]);

  const updateDocument = useCallback((doc: DocumentItem) => {
    setDocuments((prev) => {
      const updated = prev.map((d) => d.id === doc.id ? doc : d);
      persistDocuments(updated);
      return updated;
    });
  }, [persistDocuments]);

  const incrementChatCount = useCallback(() => {
    setChatCount((prev) => {
      const updated = prev + 1;
      persistChatCount(updated);
      return updated;
    });
  }, [persistChatCount]);

  const addNotification = useCallback((n: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const notif: Notification = {
      ...n,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => {
      const updated = [notif, ...prev].slice(0, 50);
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      persistNotifications(updated);
      return updated;
    });
  }, [persistNotifications]);

  const clearWorkspace = useCallback(() => {
    if (userId !== 'guest') {
      StorageService.clearUser(userId);
    }
    setDocuments([]);
    setChatCount(0);
    setNotifications([]);
  }, [userId]);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <WorkspaceContext.Provider value={{
      documents,
      chatCount,
      notifications,
      unreadNotificationCount,
      addDocument,
      removeDocument,
      updateDocument,
      incrementChatCount,
      addNotification,
      markAllNotificationsRead,
      clearWorkspace,
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextValue => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
};
