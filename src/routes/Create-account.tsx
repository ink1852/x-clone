import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  GetAuthErrorMessage,
  Input,
  Logo,
  OrLine,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-component";
import AuthButtons from "../components/auth-btns";

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
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/home");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Wrapper>
        <Logo src={"/X-logo.svg"} />
        <Title>Sign In</Title>
        <AuthButtons authErr={setError} />
        <OrLine />
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
        <GetAuthErrorMessage errCode={error || ""} />
      </Wrapper>
    </>
  );
}
