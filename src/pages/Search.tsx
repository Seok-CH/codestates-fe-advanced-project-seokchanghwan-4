import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styled from "styled-components";

import Article from "../components/Article";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

import {
  searchArticles,
  selectSearch,
  increasePage,
  changeSearchword,
  changeSortBy,
} from "../redux/slice/searchSlice";

function Searchlist() {
  const { list, status, query } = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  const fetchSection = useRef() as React.MutableRefObject<HTMLDivElement>;
  const q = useLocation().search.slice(1).split("=")[1];
  const filterOption = [
    { id: "relevancy", name: "관련도순" },
    { id: "popularity", name: "인기순" },
    { id: "publishedAt", name: "최신순" },
  ];

  useEffect(() => {
    const options = {
      rootMargin: "500px",
      threshold: 0.25,
    };

    const handlefetch = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        dispatch(increasePage());
      }
    };

    const observer = new IntersectionObserver(handlefetch, options);
    observer.observe(fetchSection.current);
    return () => observer.disconnect();
  }, [dispatch]);

  useEffect(() => {
    if (!query.q) {
      dispatch(changeSearchword(q));
    } else {
      dispatch(searchArticles(query));
    }
  }, [query, q, dispatch]);

  return (
    <SearchContainer>
      <SearchBar />
      <SearchFilter>
        {filterOption.map((filter) => (
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
      <SearchList>
        {status === "loading" && <Loading />}
        {list.map((el, idx) => (
          <Article key={idx} data={el} />
        ))}
      </SearchList>
      <div style={{ height: "100px" }} ref={fetchSection}></div>
    </SearchContainer>
  );
}

const SearchContainer = styled.section`
  width: 35rem;
  margin: 0 auto;
  padding: 1rem 0;
`;

const SearchFilter = styled.div`
  display: flex;
  gap: 1rem;
  height: 2.5rem;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--gray-5);
  background-color: var(--gray-1);

  .filter-btn {
    font-size: 0.6rem;
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

const SearchList = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: var(--gray-1);
  border: 1px solid var(--gray-5);
  border-radius: 10px;
  overflow: hidden;
`;

export default Searchlist;
