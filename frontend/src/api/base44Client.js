const API_BASE = '/api';

async function request(url, options = {}) {
  const token = localStorage.getItem('access');
  const headers = { ...options.headers };
  
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/crm/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  
  if (res.status === 204) return null;
  
  const data = await res.json();
  return data.results !== undefined ? data.results : data;
}

function createEntityClient(entityName) {
  const base = `/${entityName}/`;
  return {
    list: (ordering) => request(`${base}?ordering=${ordering || ''}`),
    filter: (params = {}) => {
      const qs = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => { 
        if (v !== undefined && v !== null) qs.append(k, v); 
      });
      return request(`${base}?${qs.toString()}`);
    },
    get: (id) => request(`${base}${id}/`),
    create: (data) => request(base, { method: 'POST', body: data instanceof FormData ? data : JSON.stringify(data) }),
    update: (id, data) => request(`${base}${id}/`, { method: 'PUT', body: data instanceof FormData ? data : JSON.stringify(data) }),
    delete: (id) => request(`${base}${id}/`, { method: 'DELETE' }),
  };
}

export const base44 = {
  entities: new Proxy({}, {
    get: (target, prop) => {
      const entityMap = {
        NewsArticle: 'news',
        Contact: 'contacts',
        DiploEvent: 'events',
        HeroSlide: 'hero-slides',
        SitePopup: 'site-popups',
        DiploTask: 'tasks',
        Interaction: 'interactions',
        Media: 'media',
        Vacancy: 'vacancies',
        Scholarship: 'scholarships',
        ServiceInfo: 'services',
      };
      return createEntityClient(entityMap[prop] || prop);
    }
  }),
  auth: {
    me: async () => null, // Placeholder until Phase 3 (JWT Auth)
    logout: () => {},
    redirectToLogin: () => { window.location.href = '/crm/login'; },
  }
};
