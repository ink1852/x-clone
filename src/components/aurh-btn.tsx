import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

const Button = styled.button`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 24px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 25px;
`;

export function GithubButton() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const onClick = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      nav("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button onClick={onClick}>
        <Logo src="/github-logo.svg" />
        {loading ? "Loading..." : "Continue with Github"}
      </Button>
    </>
  );
}
export function GoogleButton() {
  const nav = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      nav("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.message);
      }
    }
  };
  return (
    <>
      <Button onClick={onClick}>
        <Logo src="/google-icon-logo-svgrepo-com.svg" />
        Continue with Google
      </Button>
    </>
  );
}
