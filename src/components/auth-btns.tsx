import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  useState,
  type Dispatch,
  type MouseEventHandler,
  type SetStateAction,
} from "react";
const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
`;
const Button = styled.button`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px 20px;
  border-radius: 24px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 16px;
`;
const Logo = styled.img`
  height: 24px;
`;

interface onClickType {
  authSrc: string;
  imageSrc: string;
  onclick: MouseEventHandler<HTMLButtonElement>;
}

function AuthBtn({ authSrc, imageSrc, onclick }: onClickType) {
  return (
    <>
      <Button onClick={onclick}>
        <Logo src={imageSrc} />
        Continue with {authSrc}
      </Button>
    </>
  );
}
interface IAuthErr {
  authErr: Dispatch<SetStateAction<string>>;
}
function GithubButton({ authErr }: IAuthErr) {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const onClick = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      nav("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code);
        authErr(err.code);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AuthBtn
        authSrc={"Github"}
        imageSrc={"/github-logo.svg"}
        onclick={onClick}
      />
    </>
  );
}
function GoogleButton({ authErr }: IAuthErr) {
  const nav = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      nav("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code);
        authErr(err.code);
      }
    }
  };
  return (
    <>
      <AuthBtn
        authSrc={"Google"}
        imageSrc={"/google-icon-logo-svgrepo-com.svg"}
        onclick={onClick}
      />
    </>
  );
}

export default function AuthButtons({ authErr }: IAuthErr) {
  return (
    <>
      <Wrapper>
        <GithubButton authErr={authErr} />
        <GoogleButton authErr={authErr} />
      </Wrapper>
    </>
  );
}
