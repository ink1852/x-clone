import styled from "styled-components";
import PostTweetForm from "./post-tweet-form";
import Timeline from "./timline";
const Wrapper = styled.div`
  width: 600px;
  border-right: ${(prop) => prop.theme.border.default};
  text-overflow: ellipsis;
`;
export default function PostTweetColumn() {
  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
