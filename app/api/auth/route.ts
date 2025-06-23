import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Get password from environment variable
    const correctPassword = process.env.AUTH_PASSWORD || 'bookmarks123';
    
    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}