import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";

function Header() {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <HeaderContainer className="header">
      <h1 className="header__logo" onClick={goBackHome}>
        📰 NEWSAPP
      </h1>
      <NavContainer className="nav">
        <button className="nav__loginbtn">로그인</button>
      </NavContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;

  .header__logo {
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  .nav__loginbtn {
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: var(--primary-blue-7);

    &:hover {
      background-color: var(--primary-blue-1);
    }
  }
`;

export default Header;
