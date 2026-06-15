import type { AuthUser } from '../types/expense';
import { apiRequest } from './client';

export type OtpResponse = {
  challengeId: string;
  channel: 'phone' | 'email';
  message: string;
  devOtp?: string | null;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export function requestOtp(identifier: string) {
  return apiRequest<OtpResponse>('/auth/request-otp', {
    method: 'POST',
    body: { identifier },
  });
}

export function verifyOtp(identifier: string, otp: string) {
  return apiRequest<AuthResponse>('/auth/verify-otp', {
    method: 'POST',
    body: { identifier, otp },
  });
}
