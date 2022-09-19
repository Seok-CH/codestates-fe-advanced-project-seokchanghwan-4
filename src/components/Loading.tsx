import React from "react";
import styled, { keyframes } from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <LoadingSpinner>
        <div></div>
      </LoadingSpinner>
    </LoadingContainer>
  );
}

const LoadingSpinnerAnimation = keyframes`
   0% { transform: translate(-50%,-50%) rotate(0deg); }
  100% { transform: translate(-50%,-50%) rotate(360deg); }
`;

const LoadingContainer = styled.div`
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  background: transparent;
`;

const LoadingSpinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;

  div {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid #c9daf8;
    border-top-color: transparent;
    border-radius: 50%;
    animation: ${LoadingSpinnerAnimation} 1s linear infinite;
    top: 15px;
    left: 15px;
  }
`;

export default Loading;
