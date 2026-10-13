import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/chatService';
import { ChatMessage } from '../types/chat';

export function useChat(selectedDocId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | undefined>(selectedDocId);

  useEffect(() => {
    chatService.getMessages().then(setMessages);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isThinking) return;

      setIsThinking(true);
      try {
        await chatService.sendMessage(content, selectedDocumentId);
        const updated = await chatService.getMessages();
        setMessages(updated);
      } catch (err) {
        console.error('Failed to send message', err);
      } finally {
        setIsThinking(false);
      }
    },
    [isThinking, selectedDocumentId]
  );

  const toggleFeedback = useCallback(async (msgId: string, feedback: 'like' | 'dislike') => {
    await chatService.toggleFeedback(msgId, feedback);
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, feedback: m.feedback === feedback ? null : feedback } : m
      )
    );
  }, []);

  const toggleSaveToNotebook = useCallback(async (msgId: string) => {
    const saved = await chatService.toggleSaveToNotebook(msgId);
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, savedToNotebook: saved } : m))
    );
    return saved;
  }, []);

  return {
    messages,
    isThinking,
    sendMessage,
    selectedDocumentId,
    setSelectedDocumentId,
    toggleFeedback,
    toggleSaveToNotebook,
  };
}
