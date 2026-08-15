import { reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";

export const GrobalStyles = createGlobalStyle`
  ${reset};
  body{
    background-color: #17181a;
    color: white;
    font-family: "Saira Stencil", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
  }
`;
