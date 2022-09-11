import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "./components/Header";
import Main from "./pages/Main";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
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
