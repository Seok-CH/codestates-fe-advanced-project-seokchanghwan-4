import React from "react";
import { SearchResultList } from "../types/search";
import styled from "styled-components";

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
          <div className="article__thumbnailContainer">
            <img
              className="article__thumbnail"
              src={data.urlToImage}
              alt="article_thumbnail"
            />
          </div>
          <div className="article__info">
            <span className="article__source">{data.source.name}</span>
            <h2 className="article__title">{data.title}</h2>
          </div>
        </a>
        <div className="bookmark-box">{children}</div>
      </DefaultContainer>
    </Wrapper>
  );
}

function ArticleCardLarge({ data, children }: PropsType) {
  return (
    <Wrapper className="card-item">
      <LargeContainer imageUrl={data.urlToImage}>
        {children}
        <div className="article__info">
          <h2 className="article__title">{data.title}</h2>
          <span className="article__source">{data.source.name}</span>
        </div>
      </LargeContainer>
    </Wrapper>
  );
}

function ArticleCardSmall({ data, children }: PropsType) {
  return (
    <Wrapper className="card-item">
      <SmallContainer>
        <div className="article__content">
          <div className="article__info">
            <span className="article__source">{data.source.name}</span>
            <h2 className="article__title">{data.title}</h2>
          </div>
          <div className="article__thumbnailContainer">
            <img
              className="article__thumbnail"
              src={data.urlToImage}
              alt="article_thumbnail"
            />
          </div>
        </div>
        {children}
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
  .article__thumbnailContianer {
    display: flex;
    height: 8rem;
    justify-content: center;
  }

  .article__thumbnail {
    width: 100%;
    height: 8rem;
    object-fit: cover;
  }

  .article__info {
    height: 8rem;
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

  .bookmark-box {
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
    url(${(props) => props.imageUrl});

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
`;

const SmallContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 0.5rem;
  .article__content {
    display: flex;
  }

  .article__thumbnailContianer {
    display: flex;
    justify-content: center;
  }

  .article__thumbnail {
    margin-left: 0.5rem;
    height: 4rem;
    width: 6rem;
    object-fit: cover;
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
`;
export default ArticleCard;
