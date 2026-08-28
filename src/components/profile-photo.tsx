import styled from "styled-components";
import { auth } from "../firebase";

const Img = styled.img`
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;
export default function ProfilePhoto() {
  return <Img src={`${auth?.currentUser?.photoURL ?? "/public/user.jpg"}`} />;
}
