import style from "./About.module.css";
import { Fondation } from "./data";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function About() {
  const myEl = useRef([]);

  useEffect(() => {
    if (!myEl) return;

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
    //observer.observe(myRef.current);

    myEl.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section className={style.about}>
      <div className={style.aboutInner}>
        <div
          style={{ backgroundImage: `url(${Fondation.src})` }}
          className={style.aboutImg}
          ref={(el) => (myEl.current[0] = el)}
        ></div>
        <div className={style.aboutText}>
          <h2 ref={(el) => (myEl.current[1] = el)}>{Fondation.title}</h2>
          <span ref={(el) => (myEl.current[2] = el)}>{Fondation.subTitle}</span>
          <p ref={(el) => (myEl.current[3] = el)}>{Fondation.paragraph}</p>
          <Link to="/about" ref={(el) => (myEl.current[4] = el)}>
            자세히 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
