import { ofetch } from "ofetch";
import { AUTH_STORAGE_KEY } from "src/context/AuthContext";

export const authFetch = ofetch.create({
  // Fires before the request is made
  onRequest({ options }) {
    const token = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!token) return;

    // If headers are set, modify
    if (options.headers) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    } else {
      // Otherwise set new headers
      options.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  },
});
