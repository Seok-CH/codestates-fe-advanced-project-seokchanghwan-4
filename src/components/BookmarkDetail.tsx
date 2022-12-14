import React, { useState, useRef } from "react";
import styled from "styled-components";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import Article from "./Article";

import { useAppDispatch } from "../redux/hooks";
import { editBookmark, delBookmark } from "../redux/slice/bookmarkSlice";

import { SearchResultList } from "../types/search";

interface PropsType {
  data: SearchResultList;
  bookmarkIdx: number;
}

function BookmarkDetail({ data, bookmarkIdx }: PropsType) {
  const textareaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const [textareaValue, setTextareaValue] = useState(data.content);
  const [detailOn, setDetailOn] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const dispatch = useAppDispatch();

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEditmode(!editmode);

    if (!editmode) {
      textareaRef.current.disabled = false;
      textareaRef.current.focus();
    } else {
      dispatch(editBookmark({ data: textareaValue, bookmarkIdx }));
      textareaRef.current.disabled = true;
      textareaRef.current.blur();
    }
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(delBookmark(bookmarkIdx));
    setDetailOn(false);
  };

  return (
    <>
      <Article data={data}>
        <IconContainer>
          {detailOn ? (
            <AiOutlineUp onClick={() => setDetailOn(false)} />
          ) : (
            <AiOutlineDown onClick={() => setDetailOn(true)} />
          )}
        </IconContainer>
      </Article>
      {detailOn && (
        <Container>
          <h2 className="article__headline">{data.title}</h2>
          <div className="article__subinfo">
            <span className="article__datetime">
              {data.publishedAt.split("T")[0]}
            </span>
            <span className="article__author">{data.author || "unknown"}</span>
            <span className="article__source">{data.source.name}</span>
          </div>
          <textarea
            className="article__content"
            value={textareaValue}
            onChange={handleContent}
            ref={textareaRef}
          />
          <div className="article__change">
            <button className="btn-change btn-edit" onClick={handleEdit}>
              {editmode ? "????????????" : "?????? ????????????"}
            </button>
            <button className="btn-change btn-remove" onClick={handleDelete}>
              ???????????? ??????
            </button>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;

  .article__headline {
    font-weight: bold;
    line-height: 1.2;
  }
  .article__subinfo {
    display: -webkit-box;
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .article__datetime::after {
    content: "??";
    padding: 0 0.5rem;
  }

  .article__author::after {
    content: "in";
    padding: 0 0.25rem;
    font-weight: normal;
    color: gray;
  }

  .article__content {
    height: 10rem;
    &:focus {
      outline: 1px solid var(--primary-blue-7);
    }
  }

  .article__change {
    text-align: right;
  }

  .btn-change {
    margin-left: 1rem;
    font-size: 0.7rem;
    padding: 0.5rem;
    border-radius: 5px;

    &:hover {
      opacity: 0.8;
    }
  }

  .btn-edit {
    color: var(--primary-blue-6);
    border: 1px solid var(--primary-blue-6);
  }

  .btn-remove {
    color: var(--gray-1);
    background-color: var(--primary-blue-6);
  }
`;

const IconContainer = styled.div`
  > svg {
    cursor: pointer;
  }
`;

export default BookmarkDetail;
