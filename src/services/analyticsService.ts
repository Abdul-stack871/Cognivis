import {
  mockAnalyticsSummary,
  mockDocumentTypeStats,
  mockKnowledgeGrowth,
  mockProcessingActivity,
  mockQueryVelocity,
  mockTopicDistribution,
} from '../data/mockAnalytics';
import {
  AnalyticsSummary,
  DocumentTypeStat,
  KnowledgeGrowthPoint,
  ProcessingActivityItem,
  QueryVelocityPoint,
  TopicDistribution,
} from '../types/analytics';

const API_BASE_URL = 'http://localhost:8000/api';

export const analyticsService = {
  async getSummary(): Promise<AnalyticsSummary> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/summary`);
      if (response.ok) {
        const data = await response.json();
        if (data.summary) return data.summary;
      }
    } catch {
      // offline fallback
    }
    await new Promise((r) => setTimeout(r, 100));
    return mockAnalyticsSummary;
  },

  async getKnowledgeGrowth(): Promise<KnowledgeGrowthPoint[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/summary`);
      if (response.ok) {
        const data = await response.json();
        if (data.knowledgeGrowth) return data.knowledgeGrowth;
      }
    } catch {
      // offline fallback
    }
    await new Promise((r) => setTimeout(r, 120));
    return mockKnowledgeGrowth;
  },

  async getTopicDistribution(): Promise<TopicDistribution[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/summary`);
      if (response.ok) {
        const data = await response.json();
        if (data.topicDistribution) return data.topicDistribution;
      }
    } catch {
      // offline fallback
    }
    await new Promise((r) => setTimeout(r, 100));
    return mockTopicDistribution;
  },

  async getDocumentTypeStats(): Promise<DocumentTypeStat[]> {
    await new Promise((r) => setTimeout(r, 100));
    return mockDocumentTypeStats;
  },

  async getQueryVelocity(): Promise<QueryVelocityPoint[]> {
    await new Promise((r) => setTimeout(r, 100));
    return mockQueryVelocity;
  },

  async getProcessingActivity(): Promise<ProcessingActivityItem[]> {
    await new Promise((r) => setTimeout(r, 100));
    return mockProcessingActivity;
  },
};
