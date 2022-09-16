import { api } from ".";
import { ToptrendQueryList } from "../types/search";

export const getToptrendArticlesApi = (query: ToptrendQueryList) => {
  let totalQuery = `?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  for (const para in query) {
    totalQuery += `&${para}=${query[para]}`;
  }
  return api.get(`top-headlines${totalQuery}`);
};
