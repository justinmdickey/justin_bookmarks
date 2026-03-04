import { cookies } from 'next/headers';

export async function isAuthenticatedServer(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value === 'authenticated';
}
