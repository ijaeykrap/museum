import React, { useRef, useEffect } from "react";
import { AboutInfo } from "./data";
import style from "./Dproject.module.css";

const Dproject = React.forwardRef((props, ref) => {
  const a = AboutInfo[3]; //구슬모아당구장 정보 가져오기
  const animateRef = useRef([]); //스크롤 애니메이션
  useEffect(() => {
    if (!animateRef) return;

    function callback(es) {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add(style.animate);
        }
      });
    }

    const options = { root: null, rootmargin: "0px", threshold: 0.5 };

    const io = new IntersectionObserver(callback, options);

    animateRef.current.forEach((el) => {
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
    };
  }, []);
  return (
    <div className={style.item} ref={ref}>
      <div className={style.inner}>
        <div className={style.grid}>
          {a.img.map((i, index) => {
            return (
              <div
                key={index}
                className={style.img}
                ref={(el) => (animateRef.current[3 + index] = el)}
                style={{
                  backgroundImage: `url(${i.src})`,
                  backgroundColor: `${i.bgColor}`,
                }}
              >
                {i.alt}
              </div>
            );
          })}
        </div>
        <div className={style.text}>
          <h3 ref={(el) => (animateRef.current[0] = el)}>{a.title}</h3>
          <span ref={(el) => (animateRef.current[1] = el)}>{a.sub}</span>
          <p ref={(el) => (animateRef.current[2] = el)}>{a.p}</p>
        </div>
      </div>
    </div>
  );
});

export default Dproject;
