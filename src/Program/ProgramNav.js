import { NavLink, useParams, useLocation } from "react-router-dom";
import { useState } from "react";

import style from "../assets/Category.module.css";

function ProgramNav() {
  let location = useLocation();
  let pathName = location.pathname;
  let pathBoolean = pathName.includes("past");

  return (
    <section className={style.nav}>
      <div className={style.inner}>
        <ul>
          <li>
            <NavLink to="" className={!pathBoolean && style.active}>
              현재 프로그램
            </NavLink>
          </li>
          <li>
            <NavLink to="past" className={pathBoolean && style.active}>
              지난 프로그램
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ProgramNav;
