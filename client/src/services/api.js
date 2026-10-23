// API Base URL: Uses VITE_API_URL environment variable in production, falls back to localhost in dev
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

/**
 * Universal request wrapper that automatically injects JWT token
 * and normalizes JSON responses and error messages.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('sms_auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Throw custom error containing the message from backend
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // Check if error is due to calling localhost from deployed GitHub Pages
    if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1' &&
      API_BASE_URL.includes('localhost')
    ) {
      const friendlyMsg =
        'Backend server not connected: API is currently pointing to localhost. When deployed to GitHub Pages, set VITE_API_URL to your live deployed backend URL (e.g. on Render or Railway).';
      console.error(friendlyMsg);
      throw new Error(friendlyMsg);
    }

    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, error.message);
    throw error;
  }
}

// Authentication API methods
export const authAPI = {
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getMe: () =>
    request('/auth/me', {
      method: 'GET',
    }),
};

// Student CRUD & Statistics API methods
export const studentAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.department && params.department !== 'All') query.append('department', params.department);
    if (params.year && params.year !== 'All') query.append('year', params.year);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/students${queryString}`, { method: 'GET' });
  },

  getById: (id) =>
    request(`/students/${id}`, {
      method: 'GET',
    }),

  create: (studentData) =>
    request('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    }),

  update: (id, studentData) =>
    request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    }),

  delete: (id) =>
    request(`/students/${id}`, {
      method: 'DELETE',
    }),

  getStats: () =>
    request('/students/stats', {
      method: 'GET',
    }),
};

export default { authAPI, studentAPI };
