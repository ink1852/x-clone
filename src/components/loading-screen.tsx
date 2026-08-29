import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  height: 50px;
`;
export default function LoadingScreen() {
  return (
    <>
      <Wrapper>
        <Logo src="/X-logo.svg" />
      </Wrapper>
    </>
  );
}
