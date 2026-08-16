import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import styled from "styled-components";

const LogOut = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

export default function Home() {
  const nav = useNavigate();
  const logOut = () => {
    auth.signOut();
    nav("/login");
  };
  return (
    <>
      <h1>Home!</h1>
      <LogOut onClick={logOut}>Log Out</LogOut>
    </>
  );
}
