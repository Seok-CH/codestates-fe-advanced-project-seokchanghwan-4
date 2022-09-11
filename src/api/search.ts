import { api } from ".";

export interface QueryList {
  [index: string]: number | string | undefined;
  q: string;
  pageSize: number;
  page: number;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  searchIn?: "title" | "description" | "content";
}

export const searchArticlesApi = (query: QueryList) => {
  let totalQuery = `?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  for (const para in query) {
    totalQuery += `&${para}=${query[para]}`;
  }
  return api.get(`everything${totalQuery}`);
};
