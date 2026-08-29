import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  type Unsubscribe,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { database } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  createAt: number;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
}

const Wrapper = styled.div`
  width: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetQuery = query(
        collection(database, "tweets"),
        orderBy("createAt", "desc"),
        limit(25),
      );
      unsubscribe = await onSnapshot(tweetQuery, (snapShot) => {
        const tweets = snapShot.docs.map((doc) => {
          const { createAt, photo, tweet, userId, username } = doc.data();
          return {
            id: doc.id,
            createAt,
            photo: photo,
            tweet,
            userId,
            username,
          };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <>
      <Wrapper>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Wrapper>
    </>
  );
}
