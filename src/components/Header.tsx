import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../components/SearchBar";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, toggleModal, selectAuth } from "../redux/slice/authSlice";

import { FixedHeader, Logo } from "../styles/Components";

function Header() {
  const { isLogin } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openModal = () => {
    dispatch(toggleModal(true));
  };

  const goBackHome = () => {
    navigate("/");
  };

  const goBookmark = () => {
    navigate("/bookmark");
  };

  return (
    <FixedHeader zIdx={2}>
      <HeaderContainer className="header">
        <Logo clickEvent={true} onClick={goBackHome}>
          📰 NEWSAPP
        </Logo>
        <SearchBar />
        <NavContainer className="nav">
          {isLogin ? (
            <>
              <button className="nav__btn" onClick={goBookmark}>
                북마크 목록
              </button>
              <button className="nav__btn" onClick={() => dispatch(logout())}>
                로그아웃
              </button>
            </>
          ) : (
            <button className="nav__btn" onClick={openModal}>
              로그인
            </button>
          )}
        </NavContainer>
      </HeaderContainer>
    </FixedHeader>
  );
}

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  width: 64rem;
  height: 4rem;
  margin: 0 auto;
  padding: 0.5rem 2rem;
`;

const NavContainer = styled.nav`
  text-align: right;

  .nav__btn {
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: var(--primary-blue-7);
    font-size: 0.8rem;

    &:hover {
      background-color: var(--primary-blue-1);
    }
  }
`;

export default Header;
