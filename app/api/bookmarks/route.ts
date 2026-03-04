import { NextResponse } from 'next/server';
import { readBookmarks, writeBookmarks, slugify } from '@/lib/bookmarks-store';
import { isAuthenticatedServer } from '@/lib/auth-server';

export async function GET() {
  const data = readBookmarks();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await isAuthenticatedServer())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name } = body;

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const data = readBookmarks();
  const newCategory = {
    id: slugify(name),
    name,
    bookmarks: [],
  };

  data.push(newCategory);
  writeBookmarks(data);

  return NextResponse.json(newCategory, { status: 201 });
}
