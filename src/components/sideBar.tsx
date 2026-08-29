import styled from "styled-components";

const Wrapper = styled.div`
  width: 350px;
  height: 100%;
  border-radius: 24px;
  /* margin-right: 115px; */
  border: 1px solid ${(prop) => prop.theme.colors.border};
  padding: 20px;
  margin-top: 8px;
`;

export default function SideBar() {
  return (
    <>
      <Wrapper>HELLO</Wrapper>
    </>
  );
}
