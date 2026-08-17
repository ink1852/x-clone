import styled from "styled-components";

export const Wrapper = styled.div`
  --twitter-color: #1d9bf0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
  * {
    font-family: sans-serif;
  }
`;
export const Title = styled.h1`
  font-size: 42px;
  font-family: "Saira Stencil";
`;
export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  position: relative;
`;
export const Input = styled.input`
  padding: 16px 20px;
  border-radius: 50px;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }
`;
export const Error = styled.span`
  margin-top: 5px;
  color: #ed4848;
  text-align: center;
`;
export const Switcher = styled.span`
  margin-top: 10px;
  margin-bottom: 50px;
  font-size: 16px;
  a {
    color: var(--twitter-color);
  }
`;
