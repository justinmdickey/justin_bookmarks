import { NextResponse } from 'next/server';
import { readBookmarks, writeBookmarks, slugify } from '@/lib/bookmarks-store';
import { isAuthenticatedServer } from '@/lib/auth-server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  if (!(await isAuthenticatedServer())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { categoryId } = await params;
  const body = await request.json();
  const { title, url } = body;

  if (!title || !url) {
    return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 });
  }

  const data = readBookmarks();
  const category = data.find(c => c.id === categoryId);

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const newBookmark = {
    id: slugify(title),
    title,
    url,
  };

  category.bookmarks.push(newBookmark);
  writeBookmarks(data);

  return NextResponse.json(newBookmark, { status: 201 });
}
