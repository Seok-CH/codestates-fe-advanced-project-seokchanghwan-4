import { SearchResultList } from "../types/search";

export const getBookmarkApi = () => {
  const bookmark = localStorage.getItem("bookmark");
  return bookmark ? JSON.parse(bookmark) : [];
};

export const postBookmarkApi = (data: SearchResultList) => {
  const list = getBookmarkApi();
  const stringified = JSON.stringify([...list, data]);
  localStorage.setItem("bookmark", stringified);
};

export const editBookmarkApi = (data: string, bookmarkIdx: number) => {
  const list = getBookmarkApi();
  const listCopy = [...list];
  listCopy[bookmarkIdx].content = data;
  const stringified = JSON.stringify(listCopy);
  localStorage.setItem("bookmark", stringified);
};

export const delBookmarkApi = (bookmarkIdx: number) => {
  const list = getBookmarkApi();

  const stringified = JSON.stringify(
    list.filter((_: SearchResultList, idx: number) => idx !== bookmarkIdx)
  );
  localStorage.setItem("bookmark", stringified);
};
