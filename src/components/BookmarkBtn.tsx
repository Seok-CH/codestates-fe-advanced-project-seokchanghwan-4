import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { postBookmark } from "../redux/slice/bookmarkSlice";
import { selectAuth, toggleModal } from "../redux/slice/authSlice";
import { BsBookmarkPlus } from "react-icons/bs";
import { SearchResultList } from "../types/search";

interface PropsType {
  data: SearchResultList;
}

function BookmarkBtn({ data }: PropsType) {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(selectAuth);

  const addBookmark = (data: SearchResultList) => {
    isLogin ? dispatch(postBookmark(data)) : dispatch(toggleModal(true));
  };
  return (
    <Container>
      <BsBookmarkPlus
        onClick={() => {
          addBookmark(data);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  font-size: 1rem;

  > svg {
    cursor: pointer;
    &:hover {
      fill: var(--primary-blue-6);
    }
  }
`;

export default BookmarkBtn;
