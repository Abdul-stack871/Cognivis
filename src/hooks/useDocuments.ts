import { useState, useEffect, useCallback } from 'react';
import { documentService } from '../services/documentService';
import { DocumentFilter, DocumentItem, DocumentStatus } from '../types/document';

export function useDocuments(initialFilter?: DocumentFilter) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<DocumentFilter>(initialFilter || { type: 'all', status: 'all', sortBy: 'date', sortDirection: 'desc' });
  const [uploadProgress, setUploadProgress] = useState<{ active: boolean; stage: DocumentStatus; percent: number; fileName: string }>({
    active: false,
    stage: 'ready',
    percent: 0,
    fileName: '',
  });

  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await documentService.getDocuments(filter);
      setDocuments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadFile = async (file: File) => {
    setUploadProgress({
      active: true,
      stage: 'uploading',
      percent: 15,
      fileName: file.name,
    });

    try {
      const newDoc = await documentService.uploadDocument(file, (percent, stage) => {
        setUploadProgress({
          active: true,
          stage,
          percent,
          fileName: file.name,
        });
      });
      setDocuments((prev) => [newDoc, ...prev]);
      setTimeout(() => {
        setUploadProgress((p) => ({ ...p, active: false }));
      }, 1200);
      return newDoc;
    } catch (err) {
      setUploadProgress((p) => ({ ...p, active: false }));
      throw err;
    }
  };

  const deleteDocument = async (id: string) => {
    await documentService.deleteDocument(id);
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const renameDocument = async (id: string, newName: string) => {
    const updated = await documentService.renameDocument(id, newName);
    if (updated) {
      setDocuments((prev) => prev.map((d) => (d.id === id ? updated : d)));
    }
    return updated;
  };

  const toggleStar = async (id: string) => {
    const isStarred = await documentService.toggleStar(id);
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, starred: isStarred } : d)));
  };

  return {
    documents,
    loading,
    error,
    filter,
    setFilter,
    refresh: fetchDocuments,
    uploadFile,
    deleteDocument,
    renameDocument,
    toggleStar,
    uploadProgress,
  };
}
