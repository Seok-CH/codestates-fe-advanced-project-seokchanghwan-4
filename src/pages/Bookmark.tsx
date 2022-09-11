import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getBookmark,
  delBookmark,
  selectBookmark,
} from "../redux/slice/bookmarkSlice";
import { selectLogin } from "../redux/slice/loginSlice";

import Article from "../components/Article";

function Bookmark() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { list } = useAppSelector(selectBookmark);
  const { isLogin } = useAppSelector(selectLogin);

  //   if (!isLogin) navigate("/");

  useEffect(() => {
    dispatch(getBookmark());
  }, [dispatch]);

  return (
    <BookmarkContainer>
      <h2>즐겨찾기</h2>
      <BookmarkList>
        {list.map((el, idx) => (
          <Article key={idx} data={el}>
            <AiOutlineClose onClick={() => dispatch(delBookmark(idx))} />
          </Article>
        ))}
      </BookmarkList>
    </BookmarkContainer>
  );
}

const BookmarkContainer = styled.div`
  width: 35rem;
  margin: 0 auto;
  padding: 1rem 0;
`;

const BookmarkList = styled.div``;

export default Bookmark;
