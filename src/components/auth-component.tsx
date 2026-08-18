import { useEffect, useState } from "react";
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
    background-color: var(--twitter-color);
    color: white;
    &:hover {
      opacity: 0.9;
    }
  }
`;
export const Switcher = styled.span`
  margin-top: 16px;
  margin-bottom: 50px;
  font-size: 16px;
  a {
    color: var(--twitter-color);
  }
`;

export const Line = styled.div`
  margin: 36px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1px;
  background-color: gray;
  color: gray;
  span {
    padding: 0 6px;
    background-color: #17181a;
  }
`;
export function OrLine() {
  return (
    <>
      <Line>
        <span>또는</span>
      </Line>
    </>
  );
}

/* error message */
export const Error = styled.span`
  margin-top: 5px;
  color: #ed4848;
  text-align: center;
`;
export function GetAuthErrorMessage({ errCode }: { errCode: string }) {
  const [error, setError] = useState("");
  useEffect(() => {
    switch (errCode) {
      case "auth/popup-blocked":
        setError("브라우저에서 팝업이 차단되었습니다.");
        break;

      case "auth/cancelled-popup-request":
        setError("이미 로그인 창이 열려 있습니다.");
        break;

      case "auth/invalid-credential":
        setError("로그인 인증 정보가 올바르지 않습니다.");
        break;
      case "auth/email-already-in-use":
        setError("이미 가입된 이메일입니다.");
        break;
      case "auth/account-exists-with-different-credential":
        setError("이미 다른 로그인 방법으로 가입된 계정입니다.");
        break;
      case "auth/weak-password":
        setError("비밀번호는 최소 6자리 이상이어야 합니다.");
        break;
      case "":
        break;
      default:
        setError("로그인 중 오류가 발생했습니다.");
        console.log(errCode);
        break;
    }
  }, [errCode]);
  return (
    <>
      <Error>{error}</Error>
    </>
  );
}
