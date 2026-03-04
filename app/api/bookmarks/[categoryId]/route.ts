import { NextResponse } from 'next/server';
import { readBookmarks, writeBookmarks } from '@/lib/bookmarks-store';
import { isAuthenticatedServer } from '@/lib/auth-server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  if (!(await isAuthenticatedServer())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { categoryId } = await params;
  const body = await request.json();
  const data = readBookmarks();
  const index = data.findIndex(c => c.id === categoryId);

  if (index === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  if (body.name !== undefined) {
    data[index].name = body.name;
  }
  if (body.bookmarks !== undefined) {
    data[index].bookmarks = body.bookmarks;
  }

  writeBookmarks(data);
  return NextResponse.json(data[index]);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  if (!(await isAuthenticatedServer())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { categoryId } = await params;
  const data = readBookmarks();
  const index = data.findIndex(c => c.id === categoryId);

  if (index === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  data.splice(index, 1);
  writeBookmarks(data);
  return NextResponse.json({ success: true });
}
