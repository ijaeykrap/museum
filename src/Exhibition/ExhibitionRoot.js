import { Outlet, Link } from "react-router-dom";
import Navigation from "../assets/Nav";

import style from "../assets/Title.module.css";

function ExhibitLayout() {
  return (
    <>
      <section className={style.titleSection}>
        <div className={style.inner}>
          <Link to="" className={style.title}>
            Exhibition
          </Link>
        </div>
      </section>
      <Navigation />
      <Outlet />
    </>
  );
}

export default ExhibitLayout;
