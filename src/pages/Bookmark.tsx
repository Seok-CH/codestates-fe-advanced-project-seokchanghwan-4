import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getBookmark, selectBookmark } from "../redux/slice/bookmarkSlice";
import { selectAuth } from "../redux/slice/authSlice";

import BookmarkDetail from "../components/BookmarkDetail";

import { FlatList } from "../styles/Components";

function Bookmark() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list } = useAppSelector(selectBookmark);
  const { isLogin } = useAppSelector(selectAuth);

  if (!isLogin) navigate("/");

  useEffect(() => {
    dispatch(getBookmark());
  }, [dispatch]);

  return (
    <BookmarkContainer>
      <BookmarkHeadline>즐겨찾기 목록</BookmarkHeadline>
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
`;

const BookmarkHeadline = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 0;
`;

export default Bookmark;
