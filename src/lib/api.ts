import { config } from './config';

// Use centralized configuration for API base URL
const API_BASE_URL = config.apiBaseUrl;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        // Debug: Log the request details in development
        if (config.enableDebugLogs) {
            console.log('API Request:', {
                url: `${API_BASE_URL}${path}`,
                method: options.method || 'GET',
                hasToken: !!token,
                tokenStart: token.substring(0, 20) + '...'
            });
        }
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            ...headers,
            ...(options.headers || {})
        },
        credentials: 'include', // Include cookies and credentials for CORS
        mode: 'cors', // Explicitly set CORS mode
    });

    if (!response.ok) {
        const errorText = await response.text();
        // Provide a more descriptive default error
        throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    // Handle responses that might not have a body (like DELETE)
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : (null as T);
}

// The api object now has more specific types for the body parameter
export const api = {
    get: <T>(path: string): Promise<T> => request<T>(path, { method: 'GET' }),
    post: <T>(path: string, body: any): Promise<T> => 
        request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: any): Promise<T> => 
        request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
    delete: <T>(path: string): Promise<T> => 
        request<T>(path, { method: 'DELETE' }),
};