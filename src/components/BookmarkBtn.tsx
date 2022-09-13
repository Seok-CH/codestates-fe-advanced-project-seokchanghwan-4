import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { postBookmark } from "../redux/slice/bookmarkSlice";
import { selectLogin, toggleModal } from "../redux/slice/loginSlice";
import { BsBookmarkPlus } from "react-icons/bs";
import { SearchResultList } from "../types/search";

interface PropsType {
  data: SearchResultList;
}

function BookmarkBtn({ data }: PropsType) {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(selectLogin);

  const addBookmark = (data: SearchResultList) => {
    isLogin ? dispatch(postBookmark(data)) : dispatch(toggleModal(true));
  };
  return (
    <Container>
      <BsBookmarkPlus onClick={() => addBookmark(data)} />
    </Container>
  );
}

const Container = styled.div`
  width: 1rem;
  font-size: 1rem;
  color: var(--gray-8);

  > svg {
    cursor: pointer;
  }
`;

export default BookmarkBtn;
