const getApiBaseUrl = () => {
  if (import.meta.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  return '/api';
};

async function fetchJson(endpoint, options = {}) {
  const token = localStorage.getItem('aikulb_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const API_BASE = getApiBaseUrl();
  const targetUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  try {
    const res = await fetch(targetUrl, { ...options, headers });
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await res.json();
      return data;
    }

    // Handle non-JSON responses (e.g. Netlify HTML fallback / 404 pages) gracefully
    const text = await res.text();
    console.warn(`Non-JSON response for ${endpoint} (Status ${res.status}). Live fallback active.`);
    return {
      success: false,
      isHtmlFallback: true,
      status: res.status,
      message: `API endpoint ${endpoint} returned non-JSON response.`
    };
  } catch (error) {
    console.warn(`API network error on ${endpoint}:`, error);
    return { success: false, message: error.message || 'Network request failed' };
  }
}

export const api = {
  // Auth
  login: (email, password) => fetchJson('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (data) => fetchJson('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  me: () => fetchJson('/auth/me'),
  forgotPassword: (email) => fetchJson('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),

  // Products
  getProducts: (params = '') => fetchJson(`/products${params}`),
  getProductById: (id) => fetchJson(`/products/${id}`),
  getCategories: () => fetchJson('/categories'),
  saveCustomDesign: (designData) => fetchJson('/products/custom-design', { method: 'POST', body: JSON.stringify(designData) }),

  // Profiles
  createProfile: (data) => fetchJson('/profile/create', { method: 'POST', body: JSON.stringify(data) }),
  checkUsername: (username) => fetchJson(`/profile/check-username/${username}`),
  getPublicProfile: (username) => fetchJson(`/profile/${username}`),
  getMyProfile: () => fetchJson('/profile/my'),
  updateProfile: (data) => fetchJson('/profile/update', { method: 'PUT', body: JSON.stringify(data) }),
  trackInteraction: (profileId, type) => fetchJson('/profile/track', { method: 'POST', body: JSON.stringify({ profileId, type }) }),

  // Leads
  captureLead: (leadData) => fetchJson('/leads', { method: 'POST', body: JSON.stringify(leadData) }),
  getMyLeads: () => fetchJson('/leads/my'),
  updateLeadStatus: (id, status) => fetchJson(`/leads/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Cart Database Sync
  getCart: () => fetchJson('/cart'),
  syncCart: (items) => fetchJson('/cart/sync', { method: 'POST', body: JSON.stringify({ items }) }),
  clearCartDb: () => fetchJson('/cart', { method: 'DELETE' }),

  // Orders & Coupons
  createOrder: (orderData) => fetchJson('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () => fetchJson('/orders/my'),
  updateOrderStatus: (id, data) => fetchJson(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }),
  validateCoupon: (code) => fetchJson('/coupons/validate', { method: 'POST', body: JSON.stringify({ code }) }),


  // Teams
  getMyTeam: () => fetchJson('/teams/my'),
  createTeam: (name) => fetchJson('/teams', { method: 'POST', body: JSON.stringify({ name }) }),
  addTeamMember: (memberData) => fetchJson('/teams/members', { method: 'POST', body: JSON.stringify(memberData) }),

  // AI Assistant
  generateAiBio: (data) => fetchJson('/ai/bio', { method: 'POST', body: JSON.stringify(data) }),
  getAiInsights: () => fetchJson('/ai/insights'),

  // Dedicated QR Code APIs
  generateQr: (text, width = 300, format = 'json') => fetchJson(`/qr/generate?text=${encodeURIComponent(text)}&width=${width}&format=${format}`),
  getProfileQr: (username, format = 'json') => fetchJson(`/qr/profile/${username}?format=${format}`),
  getCardQr: (cardId, format = 'json') => fetchJson(`/qr/card/${cardId}?format=${format}`),
  getVCardQr: (username) => fetchJson(`/qr/vcard/${username}`),
  recordQrScan: (identifier) => fetchJson('/qr/scan', { method: 'POST', body: JSON.stringify({ identifier }) }),

  // Admin
  getAdminStats: () => fetchJson('/admin/stats'),
  createAdminProduct: (data) => fetchJson('/admin/products', { method: 'POST', body: JSON.stringify(data) }),
  updateAdminProduct: (id, data) => fetchJson(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdminProduct: (id) => fetchJson(`/admin/products/${id}`, { method: 'DELETE' }),
  getHomepageContent: () => fetchJson('/admin/content'),
  updateHomepageContent: (key, value) => fetchJson('/admin/content', { method: 'POST', body: JSON.stringify({ key, value }) }),
};
