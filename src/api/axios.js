import axios from 'axios';

// In-memory token store — the heart of "Option 3"
let accessToken = null;

export const setAccessToken = (token) => { accessToken = token; };

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,  // lets the refresh cookie travel cross-origin
});

// Attach token to every outgoing request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});



// ---- Silent refresh on 401 ----

// Single-flight guard: if 5 requests fail at once, only ONE refresh call fires
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,  // success → pass through untouched
  async (error) => {
    const original = error.config;  // the request that just failed

    // Only handle: 401 + not already retried + not the refresh call itself
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url.includes('/auth/refresh')
    ) {
      original._retry = true;  // mark it — prevents infinite retry loops

      try {
        // Reuse in-flight refresh if one exists, else start one
        refreshPromise = refreshPromise ?? api
          .post('/auth/refresh')            // cookie rides along automatically
          .then((res) => {
            setAccessToken(res.data.accessToken);
            return res.data.accessToken;
          })
          .finally(() => { refreshPromise = null; });  // reset for next time

        const newToken = await refreshPromise;

        // Retry the ORIGINAL request with the fresh token
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        // Refresh itself failed → session truly dead → surface the error
        setAccessToken(null);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);  // any other error → not our business
  }
);