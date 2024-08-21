import style from "./Program1.module.css";
import { Night } from "./data";
import { useEffect, useRef } from "react";

export default function Program1() {
  const ref = useRef([]);

  useEffect(() => {
    if (!ref) return;

    function callback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.animate);
        } else {
          entry.target.classList.remove(style.animate);
        }
      });
    }
    const options = { root: null, rootMargin: "0px", threshold: 0.3 };

    const observer = new IntersectionObserver(callback, options);

    ref.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section className={style.program1}>
      <div className={style.title}>
        <div className={style.titleBlock}>
          <h2>프로그램</h2>
        </div>
      </div>
      <div className={style.content}>
        <div
          className={style.img}
          ref={(el) => (ref.current[0] = el)}
          style={{ backgroundImage: `url(${Night.src})` }}
        ></div>
        <div className={style.text}>
          <h3 ref={(el) => (ref.current[1] = el)}>{Night.h3}</h3>
          <p ref={(el) => (ref.current[2] = el)}>{Night.p}</p>
          <button ref={(el) => (ref.current[3] = el)}>자세히 보기</button>
        </div>
      </div>
    </section>
  );
}
