import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Bookmark from "./pages/Bookmark";

function App() {
  return (
    <BrowserRouter>
      <LoginModal />
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: var(--gray-2);
`;

export default App;
