import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const Layout = () => {
  return (
    <main className="cont">
      <Menu></Menu>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
