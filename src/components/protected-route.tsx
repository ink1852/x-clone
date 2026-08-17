import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  //console.log(user);

  if (user === null) {
    return <Navigate to={"/login"} />; //return 때문에 컴포넌트 형식 navigate를 쓰는 것
  }
  return children;
}
