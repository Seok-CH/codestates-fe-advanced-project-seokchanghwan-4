import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleModal, selectLogin } from "../redux/slice/loginSlice";

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

  const goMyPage = () => {
    navigate("/");
  };

  return (
    <HeaderContainer className="header">
      <h1 className="header__logo" onClick={goBackHome}>
        📰 NEWSAPP
      </h1>
      <NavContainer className="nav">
        {isLogin ? (
          <button className="nav__btn" onClick={goMyPage}>
            마이페이지
          </button>
        ) : (
          <button className="nav__btn" onClick={openModal}>
            로그인
          </button>
        )}
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

  .nav__btn {
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: var(--primary-blue-7);

    &:hover {
      background-color: var(--primary-blue-1);
    }
  }
`;

export default Header;
