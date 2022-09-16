import React from "react";
import styled from "styled-components";

import noimage from "../assets/images/noimage.png";
import { SearchResultList } from "../types/search";

interface PropsType {
  size?: "small" | "normal" | "large";
  data: SearchResultList;
  children: React.ReactNode;
}

interface LargeContainerPropsType {
  imageUrl: string;
}

function ArticleCard({ size, data, children }: PropsType) {
  switch (size) {
    case "small":
      return <ArticleCardSmall data={data}>{children}</ArticleCardSmall>;
    case "large":
      return <ArticleCardLarge data={data}>{children}</ArticleCardLarge>;
    default:
      return <ArticleCardDefault data={data}>{children}</ArticleCardDefault>;
  }
}

function ArticleCardDefault({ data, children }: PropsType) {
  return (
    <Wrapper className="card-item">
      <DefaultContainer>
        <a href={data.url} target="_blank" rel="noreferrer">
          <img
            className="article__thumbnail"
            src={data.urlToImage || noimage}
            alt="article_thumbnail"
          />
          <div className="article__info">
            <span className="article__source">{data.source.name}</span>
            <h2 className="article__title">{data.title}</h2>
          </div>
        </a>
        <div className="article__bookmark">{children}</div>
      </DefaultContainer>
    </Wrapper>
  );
}

function ArticleCardLarge({ data, children }: PropsType) {
  return (
    <Wrapper className="card-item">
      <LargeContainer imageUrl={data.urlToImage || noimage}>
        <div className="article__bookmark">{children}</div>
        <a href={data.url} target="_blank" rel="noreferrer">
          <div className="article__info">
            <h2 className="article__title">{data.title}</h2>
            <span className="article__source">{data.source.name}</span>
          </div>
        </a>
      </LargeContainer>
    </Wrapper>
  );
}

function ArticleCardSmall({ data, children }: PropsType) {
  return (
    <Wrapper className="card-item">
      <SmallContainer>
        <a href={data.url} target="_blank" rel="noreferrer">
          <div className="article__content">
            <div className="article__info">
              <span className="article__source">{data.source.name}</span>
              <h2 className="article__title">{data.title}</h2>
            </div>
            <img
              className="article__thumbnail"
              src={data.urlToImage || noimage}
              alt="article_thumbnail"
            />
          </div>
        </a>
        <div className="article__bookmark">{children}</div>
      </SmallContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: var(--gray-1);
  border-radius: 5px;
  box-shadow: 0px 1.6px 3.6px rgb(0 0 0 / 13%), 0px 0px 2.9px rgb(0 0 0 / 11%);
  overflow: hidden;
`;

const DefaultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .article__thumbnail {
    width: 100%;
    height: 8rem;
    object-fit: cover;
  }

  .article__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  .article__title {
    display: -webkit-box;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .article__source {
    font-size: 0.7rem;
  }

  .article__bookmark {
    margin-top: 1rem;
    padding: 0.5rem;
  }
`;

const LargeContainer = styled.div<LargeContainerPropsType>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  height: 100%;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0.6)
    ),
    url(${(props) => props.imageUrl}) no-repeat center;

  .article__info {
    color: var(--gray-1);
  }

  .article__title {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .article__source {
    margin-bottom: 1rem;
    font-size: 0.7rem;
  }

  .article__bookmark {
    color: var(--gray-1);
  }
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.5rem;

  .article__content {
    display: flex;
    gap: 0.5rem;
  }

  .article__thumbnail {
    height: 4rem;
    width: 50%;
    object-fit: cover;
  }

  .article__info {
    width: 50%;
  }

  .article__title {
    display: -webkit-box;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    font-weight: bold;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .article__source {
    font-size: 0.6rem;
  }

  .article__bookmark {
    margin-top: 1rem;
  }
`;
export default ArticleCard;
