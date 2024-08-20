import { now } from "./data";
import { useEffect, useRef } from "react";

import style from "./Exhibition.module.scss";

export default function Exhibition() {
  const ref = useRef([]);

  useEffect(() => {
    if (!ref) return;

    function callback(es) {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add(style.animate);
        }
      });
    }

    const options = { root: null, rootmargin: "0px", threshold: 0.5 };

    const io = new IntersectionObserver(callback, options);

    ref.current.forEach((el) => {
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
    };
  }, []);
  return (
    <>
      <section className={style.exhibition}>
        <ul className={style.list}>
          {now.map((n, index) => {
            return (
              <li
                key={n.title}
                className={style.item}
                ref={(el) => (ref.current[index] = el)}
              >
                <div
                  className={style.img}
                  style={{
                    backgroundImage: `url(${n.src})`,
                    backgroundColor: `${n.bgColor}`,
                  }}
                >
                  <div
                    className={style.hov}
                    style={{ backgroundColor: `${n.bgColor}` }}
                  ></div>
                </div>
                <div className={style.text}>
                  <span className={style.place}>{n.place}</span>
                  <h3 className={style.title}>{n.title}</h3>
                  <h3 className={style.sub}>{n.sub}</h3>
                  <span className={style.date}>{n.date}</span>
                  <a className={style.book}>예약하기</a>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
