export interface BlogPost {
  _id: string;
  _title: string;
  slug: string;
  excerpt: string;
  content: {
    raw: string;
    html: string;
  };
  coverImage?: {
    url: string;
    alt?: string;
  };
  publishedAt: string;
  author?: string;
  category?: string;
  readingTime?: number;
}

export interface BlogCategory {
  _id: string;
  _title: string;
  slug: string;
}
