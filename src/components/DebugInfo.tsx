import React from 'react';
import { config } from '../lib/config';

const DebugInfo: React.FC = () => {
  // Only show in development or when debug is enabled
  if (!config.isDevelopment && !config.enableDebugLogs) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🔧 Debug Info</h3>
      <div className="space-y-1">
        <div><strong>API URL:</strong> {config.apiBaseUrl}</div>
        <div><strong>Environment:</strong> {config.isDevelopment ? 'Development' : 'Production'}</div>
        <div><strong>Env Var:</strong> {import.meta.env.VITE_API_BASE_URL || 'Not set'}</div>
        <div><strong>Mode:</strong> {import.meta.env.MODE}</div>
        <div><strong>DEV:</strong> {String(import.meta.env.DEV)}</div>
        <div><strong>PROD:</strong> {String(import.meta.env.PROD)}</div>
      </div>
    </div>
  );
};

export default DebugInfo;
