import { NavLink } from "react-router-dom";
import { ShopInfo } from "./data";

import style from "./ShopNav.module.css";

function ShopNav() {
  return (
    <section className={style.nav}>
      <div className={style.inner}>
        <ul>
          {ShopInfo.map((s, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={s.id}
                  className={({ isActive }) =>
                    isActive ? style.active : undefined
                  }
                >
                  {s.id}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ShopNav;
