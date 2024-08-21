import { NavLink, useLocation } from "react-router-dom";

import style from "../assets/Category.module.css";

function Navigation() {
  let location = useLocation();
  let pathName = location.pathname;
  let pathBoolean = pathName.includes("exhibition");
  let timeBoolean = pathName.includes("past");

  return (
    <section className={style.nav}>
      <div className={style.inner}>
        {pathBoolean && (
          <ul>
            <li>
              <NavLink to="" className={!timeBoolean && style.active}>
                현재 전시
              </NavLink>
            </li>
            <li>
              <NavLink to="past" className={timeBoolean && style.active}>
                지난 전시
              </NavLink>
            </li>
          </ul>
        )}

        {!pathBoolean && (
          <ul>
            <li>
              <NavLink to="" className={!timeBoolean && style.active}>
                현재 프로그램
              </NavLink>
            </li>
            <li>
              <NavLink to="past" className={timeBoolean && style.active}>
                지난 프로그램
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}

export default Navigation;
