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
  color: white;
  border: none;
  outline: none;
  resize: none;
  &:focus {
    border-bottom: ${(prop) => prop.theme.border.default};
  }
  &:not(:placeholder-shown) {
    &:not(:focus) {
      border-bottom: ${(prop) => prop.theme.border.default};
    }
  }
`;
const PhotoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 16px;
`;
const CancelBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px;
  border-radius: 50%;
  background-color: #000000ca;
  border: none;
  & > svg {
    color: #fff;
    height: 20px;
  }
  &:hover {
    transition: background-color 0.25s;
    background-color: #272727c7;
  }
`;
const Photo = styled.img`
  width: 480px;
  border-radius: 20px;
`;
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
  cursor: ${(prop) => (prop.$isTweet ? "cursor" : "auto")};
  outline: none;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  color: ${(prop) => prop.theme.colors.background};
`;
const Error = styled.span`
  margin: 16px 0;
  font-size: 14px;
  color: ${(prop) => prop.theme.colors.error};
`;
const DivButInput = styled.div`
  padding: 8px;
  background-color: ${(prop) => prop.theme.colors.background};
  outline: none;
  font-size: 20px;
  color: white;
`;
export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [textAreaRows, setTextAreaRows] = useState(0);
  const [isTweet, setIsTweet] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [imgSizeError, setImgSizeError] = useState(false);

  /** 파이어베이스에 저장되는 doc 노드 최대 용량이 1mb, 1000kb는 이미지, 24kb는 나머지 용량 */
  const FILE_SIZE = 1024 * 1000;
  /** 최대 작성 길이 */
  const MAX_TEXT_LENGTH = 160;

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tweetLength = e.currentTarget.value.length;
    tweetLength > MAX_TEXT_LENGTH || tweet.startsWith(" ")
      ? setIsTweet(false)
      : setIsTweet(true);
    setTweet(e.currentTarget.value);
  };

  const onFocus = () => {
    if (imgSizeError) {
      setImgSizeError(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const reader = new FileReader();
      const theFile = files[0];
      if (theFile.size < FILE_SIZE) {
        // base64 인코딩
        reader.readAsDataURL(theFile);
        reader.onloadend = () => {
          setFile(reader.result as string);
        };
      } else {
        setImgSizeError(true);
        return;
      }
    }
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || tweet.startsWith(" ") || tweet === "") return;
    try {
      const user = auth.currentUser;
      setIsLoading(true);
      await addDoc(collection(database, "tweets"), {
        tweet,
        createAt: Date.now(),
        username: user?.displayName ?? "Anonymous",
        userId: user?.uid,
        photo: file,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsTweet(false);
      setImgSizeError(false);
      setTextAreaRows(3);
      setTweet("");
      setFile(null);
    }
  };
  /* const [text, setText] = useState("");
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const newT = e.currentTarget.innerText;
    setText(newT);
  };
  console.log(text); */
  return (
    <>
      <Wrapper>
        <ProfilePhoto />
        <Form onSubmit={onSubmit}>
          <TextArea
            name="text-tweet"
            onChange={onChange}
            onFocus={onFocus}
            rows={3}
            placeholder={`What's happening?(${MAX_TEXT_LENGTH}자 까지)`}
            value={tweet}
          />
          {/* <div
            style={{
              width: "inherit",
              padding: "8px",
              backgroundColor: "skyblue",
              margin: "16px 0px",
            }}
          >
            <DivButInput
              onKeyDown={onKeyDown}
              role="textbox"
              contentEditable="true"
              spellCheck="true"
            ></DivButInput>
          </div> */}

          {file !== null ? (
            <PhotoContent>
              <CancelBtn
                onClick={() => {
                  setFile(null);
                }}
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </CancelBtn>
              <Photo src={file}></Photo>
            </PhotoContent>
          ) : imgSizeError ? (
            <Error>용량이 너무 큽니다</Error>
          ) : null}

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
