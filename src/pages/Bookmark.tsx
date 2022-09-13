import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getBookmark, selectBookmark } from "../redux/slice/bookmarkSlice";
import { selectLogin } from "../redux/slice/loginSlice";

import BookmarkDetail from "../components/BookmarkDetail";

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
      <BookmarkList>
        {list.map((el, idx) => (
          <BookmarkDetail bookmarkIdx={idx} data={el} />
        ))}
      </BookmarkList>
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

const BookmarkList = styled.div`
  position: relative;
  background-color: var(--gray-1);
  border: 1px solid var(--gray-5);
  border-radius: 10px;
  overflow: hidden;
`;

export default Bookmark;
