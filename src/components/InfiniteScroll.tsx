import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "../redux/hooks";
import { increaseSearchPage } from "../redux/slice/searchSlice";
import { increaseToptrendPage } from "../redux/slice/toptrendSlice";

interface PropsType {
  type: "search" | "toptrend";
}

function InfiniteScroll({ type }: PropsType) {
  const fetchSection = useRef() as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const options = {
      rootMargin: "500px",
      threshold: 0.25,
    };

    const handlefetch = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        type === "search"
          ? dispatch(increaseSearchPage())
          : dispatch(increaseToptrendPage());
      }
    };

    const observer = new IntersectionObserver(handlefetch, options);
    observer.observe(fetchSection.current);
    return () => observer.disconnect();
  }, [dispatch, type]);
  return <div style={{ height: "100px" }} ref={fetchSection}></div>;
}

export default InfiniteScroll;
