import styled from "styled-components";
import type { ITweet } from "./timline";

const Wrapper = styled.div`
  width: inherit;
  padding: 0 32px;
  padding-bottom: 16px;
  border-bottom: ${(prop) => prop.theme.border.default};
`;
const Column = styled.div``;
const UserName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 24px;
`;
const Payload = styled.div`
  line-height: 20px;
  margin: 16px 0;
`;
const Photo = styled.img`
  width: 100%;
  border-radius: 18px;
`;
export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <>
      <Wrapper>
        <Column>
          <UserName>{username}</UserName>
          <Payload>{tweet}</Payload>
        </Column>
        {photo ? (
          <Column>
            <Photo src={photo} />
          </Column>
        ) : null}
      </Wrapper>
    </>
  );
}
