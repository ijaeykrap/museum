import { useState, useRef, useEffect } from "react";
import { Past } from "./data";
import style from "./PastProgram.module.css";

export default function PastProgram() {
  const [state, setState] = useState({
    year: 2022,
    active: null,
    inactive: [],
  });
  const ref = useRef([]); //메뉴 펼치기

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
  }, [state.year]);

  //연도 변경
  const minusYear = () => {
    if (state.year <= 2018) {
      setState((prev) => ({
        ...prev,
        year: 2018,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        year: prev.year - 1,
        active: null,
        inactive: [],
      }));
    }
  };
  const plusYear = () => {
    if (state.year >= 2022) {
      setState((prev) => ({
        ...prev,
        year: 2022,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        year: prev.year + 1,
        active: null,
        inactive: [],
      }));
    }
  };

  //해당 연도 인덱스 번호 가져오기
  let indexNum = Past.findIndex((obj) => obj.year === state.year);
  //useState로 관리된 연도와 일치하는 배열의 index를 가져옴
  //그 index로 화면에 뿌려줌

  const contentHandler = (index) => {
    setState((prev) => {
      //!active 처음 누를 경우
      if (!state.active) {
        return {
          ...prev,
          active: index,
          inactive: prev.inactive.filter((i) => i !== index),
        };
      } else if (state.active === index) {
        return {
          ...prev,
          active: null,
          inactive: [...prev.inactive, index],
        };
      } else if (state.active !== index) {
        const exindex = state.active;
        return {
          ...prev,
          active: index,
          inactive: prev.inactive.filter((i) => i !== index).concat(exindex),
        };
      }
      //active === index 한 번 더 눌러서 닫기
      //active !== index 다른거 클릭하기
    });
  };

  console.log("active : ", state.active);
  console.log("inactive : ", state.inactive);

  return (
    <section className={style.program}>
      <div className={style.inner}>
        <div className={style.subj}>
          <h3>History</h3>
          <div className={style.year}>
            <button
              onClick={minusYear}
              className={state.year <= 2018 ? style.blind : null}
            ></button>
            <span>{state.year}</span>
            <button
              onClick={plusYear}
              className={state.year >= 2022 ? style.blind : null}
            ></button>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.index}>
          <span className={style.indexTitle}>title</span>
          <span className={style.indexType}>type</span>
          <span className={style.indexFor}>for</span>
        </div>

        <ul className={style.list}>
          {indexNum === -1 ? (
            <div className={style.not}>
              <h3>해당 연도의 프로그램이 없습니다</h3>
            </div>
          ) : (
            Past[indexNum].item.map((n, index) => {
              return (
                <li
                  ref={(el) => (ref.current[index] = el)}
                  key={index}
                  className={
                    state.active === index.toString()
                      ? style.active
                      : state.inactive.includes(index.toString())
                      ? style.inactive
                      : null
                  }
                  onClick={() => contentHandler(index.toString())}
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
            })
          )}
        </ul>
      </div>
    </section>
  );
}
