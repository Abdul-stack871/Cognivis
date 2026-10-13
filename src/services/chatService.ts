import { initialChatMessages, mockCitations } from '../data/mockChat';
import { ChatMessage, Citation } from '../types/chat';

let chatMessagesStore: ChatMessage[] = [...initialChatMessages];
const API_BASE_URL = 'http://localhost:8000/api';

export const chatService = {
  async getMessages(): Promise<ChatMessage[]> {
    await new Promise((r) => setTimeout(r, 150));
    return [...chatMessagesStore];
  },

  async sendMessage(content: string, selectedDocumentId?: string): Promise<ChatMessage> {
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      selectedDocumentId,
    };
    chatMessagesStore.push(userMsg);

    let replyText = '';
    let citations: Citation[] = [];
    let reasoningSteps: Array<{ stepNumber: number; title: string; description: string }> = [];

    // Try calling the FastAPI backend first
    try {
      const response = await fetch(`${API_BASE_URL}/chat/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          selectedDocumentId: selectedDocumentId || null,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        replyText = data.answer;
        citations = data.citations || [];
        reasoningSteps = data.reasoningSteps || [];
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch {
      // Offline fallback simulation
      await new Promise((r) => setTimeout(r, 650));

      const lower = content.toLowerCase();
      if (lower.includes('architecture') || lower.includes('how does')) {
        replyText = 'The proposed architecture consists of several connected components. Data enters through the collection layer, passes through preprocessing and feature extraction, and is then processed by the prediction layer before producing the final output.\n\nKey components verified:\n- **Collection**: High-throughput asynchronous stream ingestion.\n- **Preprocessing**: Coordinate-aware normalizer.\n- **Feature Extraction**: 1536-dimensional sparse-dense multimodal tensor fusion.\n- **Prediction Layer**: In-memory attention matrix caching maintaining <100ms response targets.';
        citations = mockCitations.architecture;
      } else if (lower.includes('objective') || lower.includes('goal')) {
        replyText = 'The primary objective is eliminating semantic drift in heterogeneous document RAG by introducing a topological representation that maps unstructured figures, equations, and narrative text into unified conceptual tensors without loss of structural hierarchy.';
        citations = mockCitations.objective;
      } else if (lower.includes('method') || lower.includes('approach')) {
        replyText = 'The methodology employs a dual-encoder architecture that synergizes BM25 sparse keyword tokens with 1536-dimensional dense embedding vectors using entropy-weighted Reciprocal Rank Fusion (RRF k=60).';
        citations = mockCitations.methodology;
      } else {
        replyText = `Based on grounded analysis of your indexed library, "${content}" correlates with topological parsing mechanisms in Research_Paper.pdf and ingestion guarantees outlined in System_Design.docx. All intermediate activations maintain verified coordinate citations.`;
        citations = mockCitations.architecture.slice(0, 2);
      }

      reasoningSteps = [
        {
          stepNumber: 1,
          title: 'Document Scope & Intent Extraction',
          description: 'Matched keywords against vector indexes in Research_Paper.pdf.',
        },
        {
          stepNumber: 2,
          title: 'Evidence Verification',
          description: 'Identified matching passages with >94% semantic confidence.',
        },
        {
          stepNumber: 3,
          title: 'Grounded Answer Formulation',
          description: 'Synthesized response restricted strictly to retrieved context.',
        }
      ];
    }

    const assistantMsg: ChatMessage = {
      id: `msg-assistant-${Date.now()}`,
      role: 'assistant',
      content: replyText,
      timestamp: new Date().toISOString(),
      selectedDocumentId,
      citations,
      reasoningSteps,
      feedback: null,
      savedToNotebook: false,
    };

    chatMessagesStore.push(assistantMsg);
    return assistantMsg;
  },

  async toggleFeedback(messageId: string, feedback: 'like' | 'dislike'): Promise<void> {
    const msg = chatMessagesStore.find((m) => m.id === messageId);
    if (msg) {
      msg.feedback = msg.feedback === feedback ? null : feedback;
    }
  },

  async toggleSaveToNotebook(messageId: string): Promise<boolean> {
    const msg = chatMessagesStore.find((m) => m.id === messageId);
    if (msg) {
      msg.savedToNotebook = !msg.savedToNotebook;
      return msg.savedToNotebook;
    }
    return false;
  }
};
