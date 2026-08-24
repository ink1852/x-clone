import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
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
        <Title>Log In</Title>
        <AuthButtons authErr={setError} />
        <OrLine />
        <Form onSubmit={onSubmit}>
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
          <Input type="submit" value={isLoading ? "Loading..." : "Log In"} />
        </Form>
        <Switcher>
          Don't have an account? <Link to="/create-account">Sign In</Link>
        </Switcher>
        <Switcher>
          Forget password? <Link to="/reset-pswd">Click Here</Link>
        </Switcher>
        <GetAuthErrorMessage errCode={error || ""} />
      </Wrapper>
    </>
  );
}
