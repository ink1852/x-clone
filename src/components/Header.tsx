import styled from "styled-components";

const Wrapper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 50px;
`;
function Header() {
  return (
    <Wrapper>
      <Title>𝕏</Title>
    </Wrapper>
  );
}

export default Header;
