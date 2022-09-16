import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styled from "styled-components";

import Article from "../components/Article";
import InfiniteScroll from "../components/InfiniteScroll";
import BookmarkBtn from "../components/BookmarkBtn";

import {
  searchArticles,
  selectSearch,
  changeSearchword,
  changeSortBy,
  resetList,
} from "../redux/slice/searchSlice";

import { filterOptions } from "../libs/options";

import { FlatList } from "../styles/Components";

function Searchlist() {
  const { list, query } = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const q = useLocation().search?.slice(1).split("=")[1];
  if (!q) navigate("/");

  useEffect(() => {
    dispatch(changeSearchword(q));
    return () => {
      dispatch(resetList());
    };
  }, [dispatch, q]);

  useEffect(() => {
    if (query.q) dispatch(searchArticles(query));
  }, [query, dispatch]);

  return (
    <SearchContainer>
      <SearchFilter>
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn${
              filter.id === query.sortBy ? " filter-selected" : ""
            }`}
            onClick={() => dispatch(changeSortBy(filter.id))}
          >
            {filter.name}
          </button>
        ))}
      </SearchFilter>
      <FlatList>
        {list.map((el, idx) => (
          <Article key={idx} data={el}>
            <BookmarkBtn data={el} />
          </Article>
        ))}
      </FlatList>
      {list.length !== 0 && <InfiniteScroll type="search" />}
    </SearchContainer>
  );
}

const SearchContainer = styled.section`
  width: 48rem;
  margin: 0 auto;
  padding: 1rem 0;
`;

const SearchFilter = styled.div`
  display: flex;
  gap: 1rem;
  height: 3rem;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--gray-5);
  background-color: var(--gray-1);

  .filter-btn {
    font-size: 0.8rem;
    color: var(--gray-7);

    ::before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 5px;
      margin-right: 6px;
      border-radius: 50%;
      background-color: var(--gray-7);
      vertical-align: 1px;
    }
  }

  .filter-selected {
    color: var(--gray-9);
    ::before {
      background-color: #03c75a;
    }
  }
`;

export default Searchlist;
