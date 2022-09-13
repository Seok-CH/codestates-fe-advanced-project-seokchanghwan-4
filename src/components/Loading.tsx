import React from "react";
import styled, { keyframes } from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <LoadingSpinner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingSpinner>
    </LoadingContainer>
  );
}

const LoadingSpinnerAnimation = keyframes`
    0% { opacity: 1 }
  100% { opacity: 0 }

`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 30%;
  width: 2rem;
  height: 2rem;
  display: inline-block;
`;

const LoadingSpinner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;

  div {
    left: 94px;
    top: 48px;
    position: absolute;
    animation: ${LoadingSpinnerAnimation} linear 1s infinite;
    background: #333031;
    width: 4px;
    height: 8px;
    border-radius: 6px / 12px;
    transform-origin: 4px 16px;
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.9166666666666666s;
    background: #333031;
  }

  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -0.8333333333333334s;
    background: #333031;
  }

  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.75s;
    background: #333031;
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.6666666666666666s;
    background: #333031;
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.5833333333333334s;
    background: #333031;
  }

  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.5s;
    background: #333031;
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.4166666666666667s;
    background: #333031;
  }

  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.3333333333333333s;
    background: #333031;
  }

  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.25s;
    background: #333031;
  }

  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.16666666666666666s;
    background: #333031;
  }

  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.08333333333333333s;
    background: #333031;
  }

  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
    background: #333031;
  }
`;

export default Loading;
