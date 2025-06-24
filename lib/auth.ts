'use client';

export function isAuthenticated(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  
  const authCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth-token='));
  
  return authCookie?.split('=')[1] === 'authenticated';
}