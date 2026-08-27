import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "./nav";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr;
  width: 100vw;
  height: 100vh;
`;
const Main = styled.main`
  display: flex;
  justify-content: space-between;
  /* background-color: #193e63; */
`;
export default function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <>
      <Wrapper>
        <Nav />
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </>
  );
}
