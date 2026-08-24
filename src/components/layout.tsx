import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "./nav";
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  width: 100vw;
  height: 100vh;
`;
export default function Layout() {
  return (
    <>
      <Wrapper>
        <Nav />
        <Outlet />
      </Wrapper>
    </>
  );
}
