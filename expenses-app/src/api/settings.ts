import type { AppSettings } from '../types/expense';
import { apiRequest } from './client';

export function fetchSettings(token: string) {
  return apiRequest<AppSettings>('/settings', { token });
}

export function saveRemoteSettings(token: string, settings: AppSettings) {
  return apiRequest<AppSettings>('/settings', {
    method: 'PUT',
    token,
    body: settings,
  });
}
