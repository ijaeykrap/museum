import style from "./Category.module.css";
import { AboutInfo } from "./data";
import React, { useRef } from "react";
import Foundation from "./Foundation";
import Dealim from "./Dealim";
import Dmuseum from "./Dmuseum";
import Dproject from "./Dproject";

export default function Category() {
  const moveRef = useRef([]);
  const scrollMove = (index) => {
    moveRef.current[index].scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <section className={style.nav}>
        <div className={style.inner}>
          <ul>
            {AboutInfo.map((a, index) => {
              return (
                <li key={a.title} onClick={() => scrollMove(index)}>
                  {a.title}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={style.content}>
        <div className={style.inner}>
          <Foundation ref={(el) => (moveRef.current[0] = el)} />
          <Dealim ref={(el) => (moveRef.current[1] = el)} />
          <Dmuseum ref={(el) => (moveRef.current[2] = el)} />
          <Dproject ref={(el) => (moveRef.current[3] = el)} />
        </div>
      </section>
    </>
  );
}
