import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-component";
import { GithubButton, GoogleButton } from "../components/aurh-btn";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") {
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Wrapper>
        <Title>Log In</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
          />
          <Input
            onChange={onChange}
            name="password"
            placeholder="Password"
            type="password"
            value={password}
          />
          <Input type="submit" value={isLoading ? "Loading..." : "Log In"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          Don't have an account? <Link to="/create-account">Sign In</Link>
        </Switcher>
        <GithubButton />
        <GoogleButton />
      </Wrapper>
    </>
  );
}
