import { useEffect } from "react";
import styled from "styled-components";

import ArticleCard from "../components/ArticleCard";
import BookmarkBtn from "../components/BookmarkBtn";
import InfiniteScroll from "../components/InfiniteScroll";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

import {
  changeCategory,
  selectToptrend,
  getToptrendArticles,
  resetList,
} from "../redux/slice/toptrendSlice";

function Main() {
  const dispatch = useAppDispatch();
  const { query, list } = useAppSelector(selectToptrend);
  const category = [
    { id: "general", name: "일반" },
    { id: "business", name: "비즈니스" },
    { id: "health", name: "건강" },
    { id: "science", name: "과학" },
    { id: "technology", name: "기술" },
    { id: "entertainment", name: "연예" },
    { id: "sports", name: "스포츠" },
  ];

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
    return () => {
      dispatch(resetList());
    };
  }, [dispatch]);

  return (
    <MainContainer>
      <CategoryWrapper>
        <CategoryContainer>
          {category.map((el) => (
            <span
              className={`category-item${
                el.id === query.category ? " category-selected" : ""
              }`}
              key={el.id}
              onClick={() => dispatch(changeCategory(el.id))}
            >
              {el.name}
            </span>
          ))}
        </CategoryContainer>
      </CategoryWrapper>
      <ToptrendListContainer>
        {list.map((el, idx) => (
          <ArticleCard size={sizeConverter(idx)} key={idx} data={el}>
            <BookmarkBtn data={el} />
          </ArticleCard>
        ))}
      </ToptrendListContainer>
      {list.length !== 0 && <InfiniteScroll type="toptrend" />}
    </MainContainer>
  );
}

const MainContainer = styled.main``;
const CategoryWrapper = styled.div`
  position: fixed;
  width: 100%;
  background-color: var(--gray-1);
`;
const CategoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  width: 64rem;
  padding: 0.5rem 1rem;
  margin: 0 auto;
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
  width: 64rem;
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
