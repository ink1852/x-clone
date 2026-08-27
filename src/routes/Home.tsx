import styled from "styled-components";
import SideBar from "../components/sideBar";
import PostTweetColumn from "../components/post-tweet-column";
const Wrapper = styled.div`
  width: calc(90%);
  display: flex;
  justify-content: space-between;
`;
export default function Home() {
  return (
    <>
      <Wrapper>
        <PostTweetColumn />
        <SideBar />
      </Wrapper>
    </>
  );
}
