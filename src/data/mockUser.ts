export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  plan: string;
  storageUsedBytes: number;
  storageLimitBytes: number;
  joinedDate: string;
  preferences: {
    theme: 'dark' | 'cinematic';
    ambientMotion: boolean;
    autoHighlightPassages: boolean;
    citationFormat: 'inline' | 'footnote' | 'pill';
    telemetryStream: boolean;
  };
  apiIntegrations: {
    llmProvider: {
      provider: string;
      model: string;
      status: 'connected' | 'unconfigured';
      maskedKey: string;
    };
    embeddingProvider: {
      provider: string;
      model: string;
      status: 'connected' | 'unconfigured';
      maskedKey: string;
    };
    vectorDatabase: {
      provider: string;
      host: string;
      status: 'connected' | 'unconfigured';
    };
    objectStorage: {
      provider: string;
      bucket: string;
      status: 'connected' | 'unconfigured';
    };
  };
}

export const mockUser: UserProfile = {
  name: 'Dr. Abdul Rahman',
  email: 'abdul.rahman@cognivis.ai',
  role: 'Principal Research Architect',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  plan: 'Enterprise Observatory Tier',
  storageUsedBytes: 4509715660, // ~4.2 GB
  storageLimitBytes: 10737418240, // 10 GB
  joinedDate: '2026-01-15',
  preferences: {
    theme: 'dark',
    ambientMotion: true,
    autoHighlightPassages: true,
    citationFormat: 'pill',
    telemetryStream: true,
  },
  apiIntegrations: {
    llmProvider: {
      provider: 'Anthropic & OpenAI Hybrid Gateway',
      model: 'claude-3-7-sonnet / gpt-4o-grounded',
      status: 'connected',
      maskedKey: 'sk-ant-api03-••••••••••••••••38B9',
    },
    embeddingProvider: {
      provider: 'Text-Embedding-3-Large / Nomic',
      model: '1536-dimensional Dense',
      status: 'connected',
      maskedKey: 'emb-live-••••••••••••••••94F1',
    },
    vectorDatabase: {
      provider: 'Qdrant Distributed Cluster',
      host: 'https://qdrant.cluster.cognivis.internal:6333',
      status: 'connected',
    },
    objectStorage: {
      provider: 'Amazon S3 High-Durability Vault',
      bucket: 'cognivis-vault-primary-prod',
      status: 'connected',
    },
  },
};
