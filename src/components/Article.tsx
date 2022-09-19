import React, { ReactNode } from "react";
import styled from "styled-components";

import { SearchResultList } from "../types/search";

import noimage from "../assets/images/noimage.png";

interface PropsType {
  data: SearchResultList;
  children: ReactNode;
}

function Article({ data, children }: PropsType) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = noimage;
  };

  return (
    <ArticleContainer className="article">
      <div className="article__thumbnailContainer">
        <img
          className="article__thumbnail"
          src={data.urlToImage || noimage}
          alt="article_thumbnail"
          onError={handleImageError}
        />
      </div>
      <a href={data.url} target="_blank" rel="noreferrer">
        <div className="article__info">
          <h2 className="article__title">{data.title}</h2>
          <p className="article__content">{data.content}</p>
          <div className="article__subinfo">
            <span className="article__datetime">
              {data.publishedAt.split("T")[0]}
            </span>
            <span className="article__author">{data.author || "unknown"}</span>
            <span className="article__source">{data.source.name}</span>
          </div>
        </div>
      </a>
      {children}
    </ArticleContainer>
  );
}

const ArticleContainer = styled.article`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-3);

  .article__thumbnailContianer {
    display: flex;
    justify-content: center;
  }

  .article__thumbnail {
    width: 14rem;
    height: 7rem;
    object-fit: cover;
    margin-right: 1rem;
  }

  .article__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 28rem;
    height: 8rem;
    margin-right: 1rem;
  }

  .article__title,
  .article__content,
  .article__subinfo {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-box-orient: vertical;
  }

  .article__title {
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.5;
    -webkit-line-clamp: 2;
  }

  .article__content {
    font-size: 0.8rem;
    line-height: 1.2;
    color: gray;
    -webkit-line-clamp: 2;
  }

  .article__subinfo {
    font-size: 0.8rem;
    -webkit-line-clamp: 1;
  }

  .article__datetime::after {
    content: "·";
    padding: 0 0.5rem;
  }

  .article__author::after {
    content: "in";
    padding: 0 0.25rem;
    font-weight: normal;
    color: gray;
  }
`;

export default Article;
