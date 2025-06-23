export interface Bookmark {
  id: string;
  title: string;
  url: string;
}

export interface BookmarkCategory {
  id: string;
  name: string;
  bookmarks: Bookmark[];
}