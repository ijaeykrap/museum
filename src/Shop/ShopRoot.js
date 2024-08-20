import { Outlet, Link } from "react-router-dom";
import ShopNav from "./ShopNav";

import style from "../assets/Title.module.css";

function ShopLayout() {
  return (
    <>
      <section className={style.titleSection}>
        <div className={style.inner}>
          <Link to="" className={style.title}>
            shop
          </Link>
        </div>
      </section>
      <ShopNav />
      <Outlet />
    </>
  );
}

export default ShopLayout;
