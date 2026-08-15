import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h1>layout</h1>
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
      <Outlet />
    </>
  );
}
