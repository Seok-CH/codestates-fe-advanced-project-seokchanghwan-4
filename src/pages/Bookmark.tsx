import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getBookmark, selectBookmark } from "../redux/slice/bookmarkSlice";
import { selectLogin } from "../redux/slice/loginSlice";

import BookmarkDetail from "../components/BookmarkDetail";

import { FlatList } from "../styles/Components";

function Bookmark() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list } = useAppSelector(selectBookmark);
  const { isLogin } = useAppSelector(selectLogin);

  if (!isLogin) navigate("/");

  useEffect(() => {
    dispatch(getBookmark());
  }, [dispatch]);

  console.log(list);
  return (
    <BookmarkContainer>
      <h2 className="bookmark-headline">즐겨찾기 목록</h2>
      <FlatList>
        {list.map((el, idx) => (
          <BookmarkDetail key={idx} bookmarkIdx={idx} data={el} />
        ))}
      </FlatList>
    </BookmarkContainer>
  );
}

const BookmarkContainer = styled.div`
  width: 35rem;
  margin: 0 auto;
  padding: 1rem 0;

  .bookmark-headline {
    font-size: 1rem;
    font-weight: bold;
    padding: 1rem 0;
  }
`;

export default Bookmark;
