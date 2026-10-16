/// <reference types="vite/client" />
// Without the reference above, `import.meta.env` is not typed and `tsc --noEmit` fails --
// which `vite build` does not catch, because it tree-shakes this module out when no screen
// imports it yet.
//
// Where the generated API lives.
//
// Set at build time: the platform bakes the deployed API URL into the frontend build. The
// fallback is the local backend so a bare `npm run dev` still points somewhere real.
//
// The generated screens do NOT use this yet -- they render seeded sample data, exactly as
// they were approved. This is the seam to replace that with real calls, one screen at a
// time.
import { useSyncExternalStore } from "react";

export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

// --- Staff (admin) auth seam ------------------------------------------------
//
// US-024-2 owns this seam: a staff bearer token stored client-side, attached
// automatically to every /admin/* request, and cleared the moment an admin
// call comes back 403 (a customer session holds no admin rights). Later
// packets building admin screens call `apiFetch("/admin/...")` and get this
// for free; they do not need to know the token exists.
export const STAFF_TOKEN_KEY = "pocketshelf_staff_token";

type AuthListener = () => void;
const authListeners = new Set<AuthListener>();

function notifyAuthChange(): void {
  authListeners.forEach((listener) => listener());
}

/** Subscribe to staff sign-in/sign-out so a component can re-render (e.g. a route guard). */
export function subscribeAdminAuth(listener: AuthListener): () => void {
  authListeners.add(listener);
  return () => authListeners.delete(listener);
}

export function getStaffToken(): string | null {
  try {
    return window.localStorage.getItem(STAFF_TOKEN_KEY);
  } catch {
    return null;
  }
}

function setStaffToken(token: string): void {
  window.localStorage.setItem(STAFF_TOKEN_KEY, token);
  notifyAuthChange();
}

export function clearStaffToken(): void {
  window.localStorage.removeItem(STAFF_TOKEN_KEY);
  notifyAuthChange();
}

export function isAdminAuthenticated(): boolean {
  return !!getStaffToken();
}

function getAdminAuthSnapshot(): boolean {
  return isAdminAuthenticated();
}

/** React hook: re-renders the calling component on sign-in, sign-out, and forced sign-out. */
export function useAdminAuth(): boolean {
  return useSyncExternalStore(subscribeAdminAuth, getAdminAuthSnapshot, () => false);
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const isAdminPath = path.startsWith("/admin");
  const staffToken = isAdminPath ? getStaffToken() : null;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(staffToken ? { Authorization: `Bearer ${staffToken}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    // A customer session (or no session) grants no admin access: the backend answers
    // an admin call with 403, and the client drops whatever staff token it was
    // holding so any admin route guard watching `useAdminAuth` redirects to sign-in.
    if (isAdminPath && response.status === 403) {
      clearStaffToken();
    }
    throw new Error(`${init?.method ?? "GET"} ${path} failed: ${response.status}`);
  }
  return response.status === 204 ? (undefined as T) : ((await response.json()) as T);
}

export interface AdminLoginResponse {
  access_token: string;
  token_type: string;
}

export async function adminLogin(email: string, password: string): Promise<AdminLoginResponse> {
  const data = await apiFetch<AdminLoginResponse>("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setStaffToken(data.access_token);
  return data;
}

export function adminLogout(): void {
  clearStaffToken();
}
