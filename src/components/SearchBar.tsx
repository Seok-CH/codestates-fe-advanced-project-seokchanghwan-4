import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

import { useAppDispatch } from "../redux/hooks";
import { changeSearchword } from "../redux/slice/searchSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchword, setSearchword] = useState("");

  const inputSearchword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchword(event.target.value);
  };

  const doSearch = () => {
    navigate(`/search?q=${searchword}`);
    dispatch(changeSearchword(searchword));
  };

  return (
    <SearchbarContainer className="nav__searchbar">
      <AiOutlineSearch />
      <input
        type="text"
        className="nav__searchinput"
        spellCheck="false"
        placeholder="검색어를 입력해주세요"
        value={searchword}
        onChange={inputSearchword}
        onKeyPress={(e) => e.key === "Enter" && doSearch()}
      />
    </SearchbarContainer>
  );
}

const SearchbarContainer = styled.nav`
  > svg {
    position: relative;
    left: 1rem;
    top: 1.7rem;
    cursor: pointer;
  }

  .nav__searchinput {
    width: 100%;
    height: 2rem;
    padding: 0.1rem 0.75rem 0.1rem 2.5rem;
    border: 1px solid var(--gray-6);
    border-radius: 10px;
    font-size: 0.8rem;

    &:focus,
    &:hover {
      box-shadow: 1px 1px 1px 1px var(--gray-4);
      border: 1px solid var(--primary-blue-6);
    }
  }
`;

export default Header;
