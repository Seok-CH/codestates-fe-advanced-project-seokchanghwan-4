import styled, { css } from "styled-components";

export const webkitbox = css`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ArticleCard = styled.div``;

export const FlatList = styled.div`
  background-color: var(--gray-1);
  border: 1px solid var(--gray-5);
  border-radius: 10px;
  overflow: hidden;
`;
