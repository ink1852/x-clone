import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
`;
export const Title = styled.h1`
  font-size: 42px;
`;
export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 24px;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }
`;
export const Error = styled.span`
  margin-top: 5px;
  font-family: system-ui;
  color: #ed4848;
  text-align: center;
`;
export const Switcher = styled.span`
  font-family: system-ui;
  margin-top: 20px;
  font-size: 16px;
  a {
    color: #1d9bf0;
  }
`;
