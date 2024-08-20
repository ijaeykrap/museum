import { Outlet, Link } from "react-router-dom";
import Navigation from "../assets/Nav";

import style from "../assets/Title.module.css";

function ProgramLayout() {
  return (
    <>
      <section className={style.titleSection}>
        <div className={style.inner}>
          <Link to="" className={style.title}>
            Program
          </Link>
        </div>
      </section>
      <Navigation />
      <Outlet />
    </>
  );
}

export default ProgramLayout;
