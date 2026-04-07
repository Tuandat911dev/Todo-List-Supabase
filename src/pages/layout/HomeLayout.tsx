import AppFooter from "pages/layout/AppFooter";
import AppHeader from "pages/layout/AppHeader";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default HomeLayout;
