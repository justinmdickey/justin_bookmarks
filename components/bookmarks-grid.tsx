'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookmarkCategory, Bookmark } from '@/lib/types';
import { Edit2, Search, Settings, Briefcase, Shield, Home, Globe, LogOut } from 'lucide-react';
import { Dashboard } from './dashboard';
import { useState } from 'react';

interface BookmarksGridProps {
  categories: BookmarkCategory[];
  onEditBookmark?: (categoryId: string, bookmark: Bookmark) => void;
  onEditCategory?: (category: BookmarkCategory) => void;
}

export function BookmarksGrid({ categories, onEditBookmark, onEditCategory }: BookmarksGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = '/login';
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'work':
        return <Briefcase className="h-5 w-5" />;
      case 'sysadmin':
        return <Shield className="h-5 w-5" />;
      case 'homelab':
        return <Home className="h-5 w-5" />;
      case 'general':
        return <Globe className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  const BookmarkIcon = ({ url }: { url: string }) => {
    const [useAppIcon, setUseAppIcon] = useState(false);

    const getFaviconUrl = (siteUrl: string) => {
      try {
        const domain = new URL(siteUrl).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
      } catch {
        return "/android-chrome-192x192.png";
      }
    };

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const img = e.currentTarget;
      // Check if the loaded image is the default globe (very small file size)
      if (img.naturalWidth === 16 && img.naturalHeight === 16) {
        setUseAppIcon(true);
      }
    };

    if (useAppIcon) {
      return (
        <img
          src="/android-chrome-192x192.png"
          alt=""
          className="h-4 w-4 flex-shrink-0"
        />
      );
    }

    return (
      <img
        src={getFaviconUrl(url)}
        alt=""
        className="h-4 w-4 flex-shrink-0"
        onLoad={handleLoad}
        onError={() => setUseAppIcon(true)}
      />
    );
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    bookmarks: category.bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.bookmarks.length > 0 || searchTerm === '');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <img 
              src="/android-chrome-512x512.png" 
              alt="Bookmarks" 
              className="h-10 w-10"
            />
            <h1 className="text-4xl font-bold">Bookmarks</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={editMode ? "default" : "outline"}
              size="sm"
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              {editMode ? 'Done' : 'Edit'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-6 flex justify-center">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm h-10"
            autoFocus
          />
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <div className="break-inside-avoid mb-4">
          <Dashboard />
        </div>
        {filteredCategories.map((category) => (
          <Card key={category.id} className="h-fit break-inside-avoid mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category.id)}
                  <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
                </div>
                {onEditCategory && editMode && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditCategory(category)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {category.bookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="flex items-center justify-between group">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-base hover:text-primary transition-colors flex-1 truncate"
                    >
                      <BookmarkIcon url={bookmark.url} />
                      <span className="truncate">{bookmark.title}</span>
                    </a>
                    {onEditBookmark && editMode && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditBookmark(category.id, bookmark)}
                        className="h-6 w-6 p-0 transition-opacity"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}