import styled from "styled-components";
import ProfilePhoto from "./profile-photo";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../firebase";

const Wrapper = styled.div`
  padding: 18px;
  padding-bottom: 0;
  border-bottom: ${(prop) => prop.theme.border.default};
  display: flex;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  background-color: transparent;
  font-family: sans-serif;
  font-size: 18px;
  padding-top: 6px;
  color: white;
  border: none;
  resize: none;
  &:focus {
    outline: none;
    border-bottom: ${(prop) => prop.theme.border.default};
  }
  &:not(:placeholder-shown) {
    &:not(:focus) {
      border-bottom: ${(prop) => prop.theme.border.default};
    }
  }
`;
const ImgContent = styled.div``;
const ToolBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;
const AttachFileButton = styled.label`
  border-radius: 50%;
`;
const Icon = styled.div`
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  color: gray;
  & > svg {
    height: 28px;
  }
  &:hover {
    transition: all 0.2s ease-out;
    color: white;
    background-color: ${(prop) => prop.theme.colors.hover};
    transform: scale(1.1);
  }
`;
const AttachFileInput = styled.input``;
const SubmitBtn = styled.button<{ $isTweet: boolean }>`
  outline: none;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
`;
export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTweet, setIsTweet] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [textAreaRows, setTextAreaRows] = useState(3);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tweetLength = e.currentTarget.value.length;
    tweetLength > 80 ? setTextAreaRows(6) : setTextAreaRows(3);
    if (tweetLength > 160 || tweet.startsWith(" ")) {
      setIsTweet(false);
    } else {
      setIsTweet(true);
    }
    setTweet(e.currentTarget.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || tweet.startsWith(" ")) return;
    try {
      const user = auth.currentUser;
      setIsLoading(true);
      await addDoc(collection(database, "tweets"), {
        tweet,
        createAt: Date.now(),
        username: user?.displayName ?? "Anonymous",
        userId: user?.uid,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setIsTweet(false);
      setTextAreaRows(3);
      setTweet("");
    }
    console.log(tweet, tweet.length);
  };
  return (
    <>
      <Wrapper>
        <ProfilePhoto />
        <Form onSubmit={onSubmit}>
          <TextArea
            id="text-tweet"
            onChange={onChange}
            rows={textAreaRows}
            placeholder="What's happening?(150자 까지)"
            value={tweet}
          ></TextArea>
          <ImgContent>{file !== null ? file.name : "add photo"}</ImgContent>
          <ToolBar>
            <AttachFileButton htmlFor="file">
              <Icon>
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </Icon>
              <AttachFileInput
                onChange={onFileChange}
                id="file"
                type="file"
                accept="image/*"
                hidden
              />
            </AttachFileButton>
            <SubmitBtn $isTweet={isTweet} disabled={!isTweet}>
              {isLoading ? "Loading..." : "Post"}
            </SubmitBtn>
          </ToolBar>
        </Form>
      </Wrapper>
    </>
  );
}
