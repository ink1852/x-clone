import styled from "styled-components";
import PostTweetForm from "./post-tweet-form";
const Wrapper = styled.div`
  width: 600px;
  border-right: ${(prop) => prop.theme.border.default};
`;
export default function PostTweetColumn() {
  return (
    <Wrapper>
      <PostTweetForm />
    </Wrapper>
  );
}
