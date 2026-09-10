const API_BASE = '/api';

async function fetchJson(endpoint, options = {}) {
  const token = localStorage.getItem('aikulb_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    return { success: false, message: error.message };
  }
}

export const api = {
  // Products
  getProducts: (params = '') => fetchJson(`/products${params}`),
  getProductById: (id) => fetchJson(`/products/${id}`),
  getCategories: () => fetchJson('/categories'),
  saveCustomDesign: (designData) => fetchJson('/products/custom-design', { method: 'POST', body: JSON.stringify(designData) }),

  // Profiles
  getPublicProfile: (username) => fetchJson(`/profile/${username}`),
  getMyProfile: () => fetchJson('/profile/my'),
  updateProfile: (data) => fetchJson('/profile/update', { method: 'PUT', body: JSON.stringify(data) }),
  trackInteraction: (profileId, type) => fetchJson('/profile/track', { method: 'POST', body: JSON.stringify({ profileId, type }) }),

  // Leads
  captureLead: (leadData) => fetchJson('/leads', { method: 'POST', body: JSON.stringify(leadData) }),
  getMyLeads: () => fetchJson('/leads/my'),
  updateLeadStatus: (id, status) => fetchJson(`/leads/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Orders & Coupons
  createOrder: (orderData) => fetchJson('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () => fetchJson('/orders/my'),
  validateCoupon: (code) => fetchJson('/coupons/validate', { method: 'POST', body: JSON.stringify({ code }) }),

  // Teams
  getMyTeam: () => fetchJson('/teams/my'),
  createTeam: (name) => fetchJson('/teams', { method: 'POST', body: JSON.stringify({ name }) }),
  addTeamMember: (memberData) => fetchJson('/teams/members', { method: 'POST', body: JSON.stringify(memberData) }),

  // AI Assistant
  generateAiBio: (data) => fetchJson('/ai/bio', { method: 'POST', body: JSON.stringify(data) }),
  getAiInsights: () => fetchJson('/ai/insights'),

  // Admin
  getAdminStats: () => fetchJson('/admin/stats'),
  createAdminProduct: (data) => fetchJson('/admin/products', { method: 'POST', body: JSON.stringify(data) }),
  updateAdminProduct: (id, data) => fetchJson(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteAdminProduct: (id) => fetchJson(`/admin/products/${id}`, { method: 'DELETE' }),
  getHomepageContent: () => fetchJson('/admin/content'),
  updateHomepageContent: (key, value) => fetchJson('/admin/content', { method: 'POST', body: JSON.stringify({ key, value }) }),
};
