import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/Create-account";
import { reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
]);

const GrobalStyles = createGlobalStyle`
  ${reset};
  body{
    background-color: #17181a;
    color: white;
    font-family: "Saira Stencil", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
  }
`;
function App() {
  return (
    <>
      <GrobalStyles />
      <RouterProvider router={router} />
    </>
  );
}
export default App;
