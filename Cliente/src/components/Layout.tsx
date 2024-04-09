import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import { useState } from "react";
import PageHeader from "./Header/PageHeader";


const Layout = () => {
  const [menuCompleto, setMenuCompleto] = useState(false);


  return (
    <main className="cont">
      <div className="content-menu">
          {/* <Menu
            menuCompleto={menuCompleto}
            setMenuCompleto={setMenuCompleto}
          ></Menu> */}

          <PageHeader></PageHeader>
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
