import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Input, Switcher, Wrapper } from "../components/auth-component";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Form = styled.form`
  display: flex;
  width: 100%;
`;
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  color: white;
  background-color: var(--twitter-color);
`;
const EmailView = styled.div<{ $send: boolean }>`
  display: ${(props) => (props.$send ? "flex" : "none")};
  color: white;
  border-radius: 16px;
  background-color: #2b2d2d;
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  flex-direction: column;
`;
const Text = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const GmailLink = styled.a`
  display: block;
`;
export default function ResetPswd() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [isSend, setIsSend] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSend(true);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            value={email}
            placeholder="Email"
            type="email"
            required
          />
          <Button disabled={isSend}>Send</Button>
        </Form>
        <EmailView $send={isSend}>
          <Text>전송 완료!</Text>
          <GmailLink
            href="https://gmail.com"
            target="blank"
            onClick={() => {
              nav("/login");
            }}
          >
            {isSend ? "gmail.com로 이동하기" : null}
          </GmailLink>
        </EmailView>
        <Switcher>
          Remember your password? <Link to="/login">Log In</Link>
        </Switcher>
        <Switcher>
          Don't have an account? <Link to="/create-account">Sign In</Link>
        </Switcher>
      </Wrapper>
    </>
  );
}
