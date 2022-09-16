import styled, { css } from "styled-components";

interface WebkitboxPropsType {
  line: number;
}

interface FixedHeaderPropsType {
  zIdx: number;
}

interface LogoPropsType {
  clickEvent: boolean;
}

export const webkitbox = css<WebkitboxPropsType>`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: ${(props) => props.line};
  -webkit-box-orient: vertical;
`;

export const ArticleCard = styled.div``;

export const FlatList = styled.div`
  background-color: var(--gray-1);
  border: 1px solid var(--gray-5);
  border-radius: 10px;
  overflow: hidden;
`;

export const FixedHeader = styled.div<FixedHeaderPropsType>`
  position: fixed;
  z-index: ${(props) => props.zIdx};
  width: 100%;
  background-color: var(--gray-1);
  box-shadow: 1px 3px 3px var(--gray-4);
`;

export const Logo = styled.h1<LogoPropsType>`
  font-size: 1.25rem;
  font-weight: bold;

  cursor: ${(props) => (props.clickEvent ? "pointer" : "default")};
`;
