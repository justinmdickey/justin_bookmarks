import { NextResponse } from 'next/server';
import { readBookmarks, writeBookmarks } from '@/lib/bookmarks-store';
import { isAuthenticatedServer } from '@/lib/auth-server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ categoryId: string; bookmarkId: string }> }
) {
  if (!(await isAuthenticatedServer())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { categoryId, bookmarkId } = await params;
  const body = await request.json();
  const data = readBookmarks();
  const category = data.find(c => c.id === categoryId);

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const bookmark = category.bookmarks.find(b => b.id === bookmarkId);

  if (!bookmark) {
    return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
  }

  if (body.title !== undefined) {
    bookmark.title = body.title;
  }
  if (body.url !== undefined) {
    bookmark.url = body.url;
  }

  writeBookmarks(data);
  return NextResponse.json(bookmark);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ categoryId: string; bookmarkId: string }> }
) {
  if (!(await isAuthenticatedServer())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { categoryId, bookmarkId } = await params;
  const data = readBookmarks();
  const category = data.find(c => c.id === categoryId);

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const index = category.bookmarks.findIndex(b => b.id === bookmarkId);

  if (index === -1) {
    return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
  }

  category.bookmarks.splice(index, 1);
  writeBookmarks(data);
  return NextResponse.json({ success: true });
}
