import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/protected-route";
import Layout from "../components/layout";
import Home from "./Home";
import Profile from "./Profile";
import Notification from "./Notification";
import Login from "./Login";
import CreateAccount from "./Create-account";
import ResetPswd from "./reset-pswd";

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

export default router;
