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
const Header = styled.header`
  border-right: 1px solid ${(prop) => prop.theme.colors.border};
`;
const Main = styled.main``;

export default function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);

  return (
    <>
      <Wrapper>
        <Header>
          <Nav />
        </Header>
        <Main>
          <Outlet />
        </Main>
      </Wrapper>
    </>
  );
}
