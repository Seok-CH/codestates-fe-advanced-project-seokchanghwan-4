import styled from "styled-components";
import { BsBookmark } from "react-icons/bs";

import { SearchListInterface } from "../redux/slice/searchSlice";

interface PropsType {
  data: SearchListInterface;
}

function Article({ data }: PropsType) {
  return (
    <ArticleContainer className="article">
      <div className="article__thumbnailContainer">
        <img
          className="article__thumbnail"
          src={data.urlToImage}
          alt="article_thumbnail"
        />
      </div>
      <a href={data.url} target="_blank" rel="noreferrer">
        <div className="article__info">
          <h2 className="article__title">{data.title}</h2>
          <p className="article__description">{data.description}</p>
          <div className="article__subinfo">
            <span className="article__datetime">
              {data.publishedAt.split("T")[0]}
            </span>
            <span className="article__author">{data.author || "unknown"}</span>
            <span className="article__source">{data.source.name}</span>
          </div>
        </div>
      </a>
      <div className="bookmark">
        <BsBookmark />
      </div>
    </ArticleContainer>
  );
}

const ArticleContainer = styled.article`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid var(--gray-3);

  .bookmark {
    width: 1rem;
    font-size: 1rem;
    color: var(--gray-8);
  }

  .article__thumbnailContianer {
    display: flex;
    justify-content: center;
  }

  .article__thumbnail {
    width: 9rem;
    height: 5rem;
    object-fit: cover;
    margin-right: 1rem;
  }

  .article__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 21rem;
    height: 6rem;
    margin-right: 1rem;
  }

  .article__title {
    display: -webkit-box;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .article__description {
    font-size: 0.7rem;
    line-height: 1.2;
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .article__subinfo {
    display: -webkit-box;
    font-size: 0.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
