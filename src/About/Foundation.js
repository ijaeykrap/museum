import React, { useRef, useEffect } from "react";
import { AboutInfo } from "./data";
import style from "./Foundation.module.css";

const Foundation = React.forwardRef((props, ref) => {
  const a = AboutInfo[0]; //대림문화재단 정보 가져오기
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
      <div className={style.text}>
        <h3 ref={(el) => (animateRef.current[0] = el)}>{a.title}</h3>
        <span ref={(el) => (animateRef.current[1] = el)}>{a.sub}</span>
        <p ref={(el) => (animateRef.current[2] = el)}>{a.p}</p>
      </div>
      <div className={style.imgArea}>
        {a.img.map((i, index) => {
          return (
            <div
              key={index}
              className={style.img}
              ref={(el) => (animateRef.current[3] = el)}
              style={{
                backgroundImage: `url(${i.src})`,
              }}
            >
              {i.alt}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Foundation;
