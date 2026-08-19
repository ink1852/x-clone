import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { reset } from "styled-reset";
import { Helmet } from "react-helmet-async";
import { styled, createGlobalStyle } from "styled-components";
import Layout from "./components/layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/Create-account";
import LoadingScreen from "./components/loading-screen";
import Header from "./components/Header";
import ProtectedRoute from "./components/protected-route";
import "./styles/style.css";
import ResetPswd from "./routes/reset-pswd";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
  {
    path: "/reset-pswd",
    element: <ResetPswd />,
  },
]);
const Container = styled.div`
  height: 90vh;
  min-width: 280px;
  max-width: 420px;
  margin: 0 auto;
`;

const GrobalStyles = createGlobalStyle`
  ${reset};
  body{
    background-color: #17181a;
    color: white ;
    font-family: system-ui, "Saira Stencil", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
  }
  *{
    box-sizing: border-box;
  }
  a{
    text-decoration: underline;
    color: inherit;
  }
  button{
    cursor: pointer;
  }
`;
function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Saira+Stencil:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Container>
        <Header />
        <GrobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Container>
    </>
  );
}
export default App;
