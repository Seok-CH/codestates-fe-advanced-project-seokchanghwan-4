import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import SearchBar from "../components/SearchBar";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, toggleModal, selectLogin } from "../redux/slice/loginSlice";

function Header() {
  const { isLogin } = useAppSelector(selectLogin);
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
    <HeaderWrapper>
      <HeaderContainer className="header">
        <h1 className="header__logo" onClick={goBackHome}>
          📰 NEWSAPP
        </h1>
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
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 2;
  background-color: var(--gray-1);
`;

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 64rem;
  height: 3rem;
  margin: 0 auto;
  padding: 0.5rem 2rem;

  .header__logo {
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const NavContainer = styled.nav`
  text-align: right;

  .nav__btn {
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: var(--primary-blue-7);
    font-size: 0.75rem;

    &:hover {
      background-color: var(--primary-blue-1);
    }
  }
`;

export default Header;
