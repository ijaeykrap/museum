import style from "./Membership.module.css";
import { MemTable } from "./data";
import { useRef, useEffect } from "react";
export default function Membership() {
  const ref = useRef([]);

  useEffect(() => {
    if (!ref.current) return;

    function callback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.animate);
        }
      });
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver(callback, options);
    ref.current.forEach((element) => {
      if (element) observer.observe(element);
    });
  }, []);
  return (
    <section className={style.membership}>
      <div className={style.membershipInner}>
        <div className={style.banner}>
          <div className={style.img} ref={(el) => (ref.current[0] = el)}></div>
          <div
            className={style.imgDarker}
            ref={(el) => (ref.current[1] = el)}
          ></div>
          <h2 ref={(el) => (ref.current[2] = el)}>
            지금 D GREW로 가입하고 특별한 혜택을 만나보세요!
          </h2>
        </div>
        <ul className={style.list}>
          {MemTable.map((m, index) => {
            return (
              <li key={m.number} ref={(el) => (ref.current[index + 3] = el)}>
                <div className={style.itemInner}>
                  <div className={style.numBox}>
                    <span>{m.number}</span>
                  </div>
                  <div className={style.content}>
                    <p>
                      {m.content1}
                      <br />
                      {m.content2}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.more}>
        <a href="#">가입하고 혜택받기</a>
        <a href="#">로그인하고 혜택 누리기</a>
      </div>
    </section>
  );
}
