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
import ProtectedRoute from "./components/protected-route";
import ResetPswd from "./routes/reset-pswd";
import Notification from "./routes/Notification";

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
        path: "home",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "notification",
        element: <Notification />,
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
  /* height: 90vh;
  min-width: 280px;
  max-width: 420px;
  margin: 0 auto; */
  display: flex;
  justify-content: center;
  align-items: center;
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
    text-decoration: none;
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
        <GrobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </Container>
    </>
  );
}
export default App;
