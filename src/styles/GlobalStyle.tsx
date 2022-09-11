import { createGlobalStyle } from "styled-components";
import reset from "./Reset";
import palette from "./Palette";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${palette}

  @font-face {
    font-family: "Helvetica Neue";
    src: url(./assets/fonts/HelveticaNeue.otf), format('otf');
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
  }

  a {
    margin: 0;
    padding: 0;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    color: black;
  }

  input {
    border: none;

    &:focus {
      outline: none;
    }
  }

  button {
    border: 0;
    padding:0;
    background: none;
    cursor: pointer;
        
    &:focus {
        outline: none;
    }
  }

  select {
    border: 0;
    padding:0;
    background: none;
    cursor: pointer;
        
    &:focus {
        outline: none;
    }
  }
`;

export default GlobalStyle;
