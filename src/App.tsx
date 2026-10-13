import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WorkspaceProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </WorkspaceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
