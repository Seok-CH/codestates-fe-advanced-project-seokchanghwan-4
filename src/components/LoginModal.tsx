import React, { useState } from "react";
import reactDom from "react-dom";
import styled from "styled-components";
import { AiOutlineUser, AiOutlineLock, AiOutlineClose } from "react-icons/ai";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login, toggleModal, selectLogin } from "../redux/slice/loginSlice";

interface PropsType {
  children: React.ReactNode;
}

function ModalPortal({ children }: PropsType) {
  const el = document.getElementById("modal")!;
  return reactDom.createPortal(children, el);
}

function LoginModal() {
  const dispatch = useAppDispatch();
  const { isLoginError, isModalOpen } = useAppSelector(selectLogin);
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
  });

  function changeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  }

  function closeModal(e: React.MouseEvent<Element, MouseEvent>) {
    if (e.target !== e.currentTarget) return;
    dispatch(toggleModal(false));
  }

  function handleLoginBtnClick() {
    dispatch(login(inputValue));
  }

  return (
    <ModalPortal>
      {isModalOpen && (
        <LoginModalWrapper onClick={(e) => closeModal(e)}>
          <LoginModalContainer>
            <CloseIcon>
              <AiOutlineClose onClick={(e) => closeModal(e)} />
            </CloseIcon>
            <h1 className="header__logo">📰 NEWSAPP</h1>
            <LoginModalContent>
              <LoginInputContainer>
                <AiOutlineUser />
                <input
                  name="id"
                  type="text"
                  onChange={changeInputValue}
                  onKeyUp={(e) => {
                    if (e.code === "Enter") {
                      handleLoginBtnClick();
                    }
                  }}
                  value={inputValue.id}
                  placeholder="아이디"
                />
              </LoginInputContainer>
              <LoginInputContainer>
                <AiOutlineLock />
                <input
                  name="password"
                  type="password"
                  onChange={changeInputValue}
                  onKeyUp={(e) => {
                    if (e.code === "Enter") {
                      handleLoginBtnClick();
                    }
                  }}
                  value={inputValue.password}
                  placeholder="비밀번호"
                />
              </LoginInputContainer>
              {isLoginError && (
                <div className="login-alert">
                  아이디 또는 비밀번호가 틀립니다
                </div>
              )}
              <button type="button" onClick={() => handleLoginBtnClick()}>
                로그인
              </button>
            </LoginModalContent>
          </LoginModalContainer>
        </LoginModalWrapper>
      )}
    </ModalPortal>
  );
}

const LoginModalWrapper = styled.div`
  position: fixed;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LoginModalContainer = styled.div`
  width: 17.5rem;
  padding: 1rem;
  background-color: var(--gray-1);
  border-radius: 10px;

  .login-alert {
    font-size: 0.6rem;
    color: red;
  }

  .header__logo {
    text-align: center;
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;

const CloseIcon = styled.div`
  text-align: right;
  > svg {
    cursor: pointer;
  }
`;

const LoginModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    height: 2.5rem;
    margin-top: 1rem;
    background-color: var(--primary-blue-8);
    border-radius: 5px;
    color: var(--gray-1);
    font-weight: bold;
    font-size: 0.7rem;
  }
`;

const LoginInputContainer = styled.div`
  position: relative;

  > svg {
    position: absolute;
    top: 0.5rem;
    color: var(--gray-8);
    font-size: 0.9rem;
  }

  > input {
    width: 100%;
    height: 2rem;
    border-bottom: 1px solid var(--gray-5);
    padding: 0.1rem 0.5rem 0.1rem 1.5rem;
    font-size: 0.7rem;

    &:focus {
      border-bottom: 1px solid var(--primary-blue-6);
    }
  }
`;

export default LoginModal;
