import { api } from ".";
import { SearchQueryList } from "../types/search";

export const searchArticlesApi = (query: SearchQueryList) => {
  let totalQuery = `?apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  for (const para in query) {
    totalQuery += `&${para}=${query[para]}`;
  }
  return api.get(`everything${totalQuery}`);
};
