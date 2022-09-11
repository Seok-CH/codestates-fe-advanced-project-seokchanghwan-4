export interface QueryList {
  [index: string]: number | string | undefined;
  q: string;
  pageSize: number;
  page: number;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  searchIn?: "title" | "description" | "content";
}

export interface SearchResultList {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
