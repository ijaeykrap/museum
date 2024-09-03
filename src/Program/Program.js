import { useState, useEffect, useRef } from "react";
import { Now } from "./data";
import style from "./Program.module.css";

export default function Program() {
  const [active, setActive] = useState(null);
  const [inactive, setInactive] = useState([]);
  const ref = useRef([]);

  //스크롤 애니메이션
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

  const contentHandler = (index) => {
    setInactive((prevInactive) => {
      if (!active) {
        //초기 상태, 열린거 한 번 더 눌러서 닫은 후에 클릭할 때
        setActive(index);
        return prevInactive.filter((i) => i !== index);
      } else if (active === index) {
        //같은거 클릭 (열려있는거 한 번 더 클릭) -> 닫힘
        setActive(null);
        return [...prevInactive, index];
      } else if (active !== index) {
        //열려있는거 말고 다른거 클릭해서 열기
        const exindex = active;
        setActive(index);
        return prevInactive.filter((i) => i !== index).concat(exindex);
      }
    });
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
                className={
                  active === index.toString()
                    ? style.active
                    : inactive.includes(index.toString())
                    ? style.inactive
                    : null
                }
                onClick={() => {
                  contentHandler(index.toString());
                }}
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
