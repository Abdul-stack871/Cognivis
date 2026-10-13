import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppLayout } from '../layouts/AppLayout';
import { SignInPage } from '../pages/Auth/SignInPage';
import { SignUpPage } from '../pages/Auth/SignUpPage';
import { LandingPage } from '../pages/Landing/LandingPage';
import { HomePage } from '../pages/Home/HomePage';
import { DocumentsPage } from '../pages/Documents/DocumentsPage';
import { DocumentWorkspacePage } from '../pages/DocumentWorkspace/DocumentWorkspacePage';
import { ChatPage } from '../pages/Chat/ChatPage';
import { WorkflowStudioPage } from '../pages/WorkflowStudio/WorkflowStudioPage';
import { ArchitectureStudioPage } from '../pages/ArchitectureStudio/ArchitectureStudioPage';
import { KnowledgeGraphPage } from '../pages/KnowledgeGraph/KnowledgeGraphPage';
import { AnalyticsPage } from '../pages/Analytics/AnalyticsPage';
import { NotebookPage } from '../pages/Notebook/NotebookPage';
import { SettingsPage } from '../pages/Settings/SettingsPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

// Guard: redirect to /signin if not in any active session
const RequireSession: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0E0C] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }
  if (!session) return <Navigate to="/signin" replace />;
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public landing */}
      <Route path="/landing" element={<LandingPage />} />

      {/* Auth routes */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Default route: redirect to signin */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* Protected App routes */}
      <Route
        element={
          <RequireSession>
            <AppLayout />
          </RequireSession>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:id" element={<DocumentWorkspacePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/workflows" element={<WorkflowStudioPage />} />
        <Route path="/architecture" element={<ArchitectureStudioPage />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/notebook" element={<NotebookPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
