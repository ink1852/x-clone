import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-component";
import { GithubButton, GoogleButton } from "../components/aurh-btn";

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") {
      return;
    }
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      //console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
    //console.log(password, email, name);
  };
  return (
    <>
      <Wrapper>
        <Title>Sign In</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="name"
            value={name}
            type="text"
            required
            placeholder="Name"
          />
          <Input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            onChange={onChange}
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            required
          />
          <Input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
          />
        </Form>
        <Switcher>
          Aready have an account? <Link to="/login">Log In</Link>
        </Switcher>
        <GoogleButton />
        <GithubButton />
        {error !== "" ? <Error>{error}</Error> : null}
      </Wrapper>
    </>
  );
}
