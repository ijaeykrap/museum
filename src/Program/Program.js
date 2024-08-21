import { useState, useEffect, useRef } from "react";
import { Now } from "./data";
import style from "./Program.module.css";

export default function Program() {
  const [active, setActive] = useState(null);
  const [disabled, setDisabled] = useState([]);
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

    const options = { root: null, rootmargin: "0px", threshold: 0.1 };

    const io = new IntersectionObserver(callback, options);

    ref.current.forEach((el) => {
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
    };
  }, []);

  //마우스 올리면 메뉴 펼치기
  const hovering = (id) => {
    setActive(id);
    //active에 호버된 요소의 id 집어넣음
  };
  const hovered = (id) => {
    setDisabled([id, ...disabled]);
    //disabled 배열에 id 값 포함시킴
    setActive();
    //active를 null로 만듦
  };

  return (
    <section className={style.program}>
      <div className={style.subj}>
        <h3>What's on</h3>
      </div>

      <div className={style.content}>
        <div className={style.index}>
          <span className={style.indexTitle}>title</span>
          <span className={style.indexType}>type</span>
          <span className={style.indexFor}>for</span>
        </div>
        <ul className={style.list}>
          {Now.map((n, index) => {
            return (
              <li
                ref={(el) => (ref.current[index] = el)}
                key={index}
                id={index}
                onMouseOver={() => {
                  hovering(index.toString());
                  //hovering 함수에 문자열이 된 index 집어넣음
                }}
                onMouseOut={() => {
                  hovered(index.toString());
                }}
                className={
                  active === index.toString()
                    ? style.active
                    : //active와 index가 같다면 호버 시켜라
                    disabled.includes(index.toString())
                    ? //disabled 배열에 index 값이 포함되었다면
                      //className에 item 줘라
                      style.item
                    : null
                }
                //className={style.active}
              >
                <div className={style.inner}>
                  <div className={style.text}>
                    <div className={style.headLine}>
                      <span className={style.title}>{n.title}</span>
                      <div className={style.mark}>
                        <span className={style.type}>{n.type}</span>
                        <span className={style.for}>{n.for}</span>
                      </div>
                    </div>
                    <p className={style.des}>{n.des}</p>
                    <button className={style.book}>
                      <span>신청하기</span>
                    </button>
                  </div>
                  <div
                    className={style.img}
                    style={{ backgroundImage: `url(${n.src})` }}
                    aria-label={n.label}
                  >
                    <span className={style.place}>{n.place}</span>
                  </div>
                  <div className={style.sign}>
                    <div className={style.plus}></div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
