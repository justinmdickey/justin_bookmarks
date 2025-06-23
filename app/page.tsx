'use client';

import { useState, useEffect } from 'react';
import { BookmarksGrid } from '@/components/bookmarks-grid';
import { bookmarksData } from '@/lib/bookmarks-data';
import { BookmarkCategory, Bookmark } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<BookmarkCategory[]>(bookmarksData);
  const [editingBookmark, setEditingBookmark] = useState<{
    categoryId: string;
    bookmark: Bookmark;
  } | null>(null);
  const [editingCategory, setEditingCategory] = useState<BookmarkCategory | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const [bookmarkForm, setBookmarkForm] = useState({
    title: '',
    url: ''
  });
  
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    bookmarks: ''
  });

  const handleEditBookmark = (categoryId: string, bookmark: Bookmark) => {
    setEditingBookmark({ categoryId, bookmark });
    setBookmarkForm({
      title: bookmark.title,
      url: bookmark.url
    });
  };

  const handleEditCategory = (category: BookmarkCategory) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      bookmarks: category.bookmarks.map(b => `${b.title} | ${b.url}`).join('\n')
    });
  };

  const saveBookmark = () => {
    if (!editingBookmark) return;
    
    setCategories(prev => prev.map(category => {
      if (category.id === editingBookmark.categoryId) {
        return {
          ...category,
          bookmarks: category.bookmarks.map(bookmark =>
            bookmark.id === editingBookmark.bookmark.id
              ? { ...bookmark, title: bookmarkForm.title, url: bookmarkForm.url }
              : bookmark
          )
        };
      }
      return category;
    }));
    
    setEditingBookmark(null);
    setBookmarkForm({ title: '', url: '' });
  };

  const saveCategory = () => {
    if (!editingCategory) return;
    
    // Parse bookmarks from textarea
    const bookmarkLines = categoryForm.bookmarks.split('\n').filter(line => line.trim());
    const newBookmarks: Bookmark[] = bookmarkLines.map((line, index) => {
      const parts = line.split(' | ');
      const title = parts[0]?.trim() || `Bookmark ${index + 1}`;
      const url = parts[1]?.trim() || 'https://example.com';
      return {
        id: `${editingCategory.id}-${index}`,
        title,
        url
      };
    });
    
    setCategories(prev => prev.map(category =>
      category.id === editingCategory.id
        ? { ...category, name: categoryForm.name, bookmarks: newBookmarks }
        : category
    ));
    
    setEditingCategory(null);
    setCategoryForm({ name: '', bookmarks: '' });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Bookmarks</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BookmarksGrid
        categories={categories}
        onEditBookmark={handleEditBookmark}
        onEditCategory={handleEditCategory}
      />

      {/* Bookmark Edit Dialog */}
      <Dialog open={!!editingBookmark} onOpenChange={() => setEditingBookmark(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bookmark</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={bookmarkForm.title}
                onChange={(e) => setBookmarkForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={bookmarkForm.url}
                onChange={(e) => setBookmarkForm(prev => ({ ...prev, url: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingBookmark(null)}>
                Cancel
              </Button>
              <Button onClick={saveBookmark}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Category Edit Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="bookmarks">Bookmarks (one per line: Title | URL)</Label>
              <Textarea
                id="bookmarks"
                value={categoryForm.bookmarks}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, bookmarks: e.target.value }))}
                rows={10}
                placeholder="GitHub | https://github.com&#10;Google | https://google.com"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingCategory(null)}>
                Cancel
              </Button>
              <Button onClick={saveCategory}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}