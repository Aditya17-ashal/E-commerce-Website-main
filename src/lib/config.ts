// Application configuration
export const config = {
  // API Base URL - uses environment variable with fallback to localhost for development
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082',
  
  // Environment detection
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Debug mode
  enableDebugLogs: import.meta.env.DEV || import.meta.env.VITE_DEBUG === 'true'
} as const;

// Log configuration in both development and production for debugging
console.log('🔧 App Configuration:', {
  apiBaseUrl: config.apiBaseUrl,
  environment: config.isDevelopment ? 'development' : 'production',
  debugLogs: config.enableDebugLogs,
  envVariable: import.meta.env.VITE_API_BASE_URL,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
});
