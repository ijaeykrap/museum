import style from "./exhibition.module.css";
import { Exhibit } from "./data";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function Exhibition() {
  const myRef = useRef([]);

  useEffect(() => {
    if (!myRef.current) return;

    function callback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.animate);
        }
      });
    }
    const options = { root: null, rootMargin: "0px", threshold: 0.5 };

    const observer = new IntersectionObserver(callback, options);
    //observer.observe(myRef.current);

    myRef.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={style.exhibition}>
      <div className={style.title}>
        <div className={style.titleBlock}>
          <h2>현재 진행 중인 전시</h2>
        </div>
      </div>

      <div className={style.list}>
        {Exhibit.map((e, index) => {
          return (
            <div
              key={e.title1}
              className={style.item}
              ref={(el) => (myRef.current[index] = el)}
            >
              <div className={style.img}>{e.alt}</div>
              <div className={style.text}>
                <h3 ref={(el) => (myRef.current[index + 2] = el)}>
                  {e.title1}
                  <br />
                  {e.title2}
                </h3>
                <p
                  className={style.place}
                  ref={(el) => (myRef.current[index + 4] = el)}
                >
                  {e.place}
                </p>
                <p
                  className={style.date}
                  ref={(el) => (myRef.current[index + 6] = el)}
                >
                  {e.date}
                </p>
                <button
                  className={style.book}
                  ref={(el) => (myRef.current[index + 8] = el)}
                >
                  예약하기
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.more}>
        <Link to="/exhibition"> 현재 진행 중인 전시 보러가기 </Link>
      </div>
    </section>
  );
}
