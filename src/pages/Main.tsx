import { useEffect } from "react";
import styled from "styled-components";

import ArticleCard from "../components/ArticleCard";
import BookmarkBtn from "../components/BookmarkBtn";
import InfiniteScroll from "../components/InfiniteScroll";
import Loading from "../components/Loading";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  changeCategory,
  selectToptrend,
  getToptrendArticles,
  resetList,
} from "../redux/slice/toptrendSlice";

import { categoryOptions } from "../libs/options";
import { FixedHeader } from "../styles/Components";

function Main() {
  const dispatch = useAppDispatch();
  const { query, list, status } = useAppSelector(selectToptrend);

  const sizeConverter = (idx: number) => {
    return (idx + 1) % 12 === 1
      ? "large"
      : (idx + 1) % 12 === 0 || (idx + 1) % 12 === 3
      ? "small"
      : "normal";
  };

  useEffect(() => {
    dispatch(getToptrendArticles(query));
  }, [query, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    return () => {
      dispatch(resetList());
    };
  }, [dispatch, query.category]);

  return (
    <>
      <FixedHeader zIdx={3}>
        <CategoryContainer>
          {categoryOptions.map((category) => (
            <span
              className={`category-item${
                category.id === query.category ? " category-selected" : ""
              }`}
              key={category.id}
              onClick={() => dispatch(changeCategory(category.id))}
            >
              {category.name}
            </span>
          ))}
        </CategoryContainer>
      </FixedHeader>
      <MainContainer>
        <ToptrendListContainer>
          {list.map((el, idx) => (
            <ArticleCard size={sizeConverter(idx)} key={idx} data={el}>
              <BookmarkBtn data={el} />
            </ArticleCard>
          ))}
          {status === "loading" && <Loading />}
        </ToptrendListContainer>
        {list.length !== 0 && <InfiniteScroll type="toptrend" />}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  width: 64rem;
  margin: 0 auto;
`;

const CategoryContainer = styled.div`
  width: 64rem;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: var(--gray-7);

  .category-item {
    cursor: pointer;
    padding: 0.5rem 1rem;

    &:hover {
      background-color: var(--gray-4);
    }
  }

  .category-selected {
    color: var(--gray-9);
    font-weight: bold;
    border-bottom: 1.5px solid var(--primary-blue-6);
  }
`;

const ToptrendListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, minmax(8rem, auto));
  grid-auto-flow: dense;
  gap: 1rem;
  padding: 4rem 1rem;
  margin: 0 auto;

  .card-item {
    grid-column: auto / span 1;
    grid-row: auto / span 2;
  }

  .card-item:nth-child(12n + 1) {
    grid-column: auto / span 2;
    grid-row: auto / span 2;
  }

  .card-item:nth-child(12n + 3),
  .card-item:nth-child(12n + 12) {
    grid-column: auto / span 1;
    grid-row: auto / span 1;
  }
`;

export default Main;
