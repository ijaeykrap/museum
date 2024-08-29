import { useState, useRef, useEffect } from "react";
import { Past } from "./data";
import style from "./PastProgram.module.css";

export default function PastProgram() {
  const [year, setYear] = useState(2022); //연도 설정
  const [active, setActive] = useState(null); //펼쳐서 보여줄 메뉴의 index 관리
  const [disabled, setDisabled] = useState([]); //펼쳐졌다가 닫힌 애들의 index관리
  const ref = useRef([]); //스크롤 애니메이션

  console.log(active);
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

  //연도 변경
  const minusYear = () => {
    if (year <= 2018) {
      setYear(2018);
    } else {
      setYear((prev) => prev - 1);
    }
  };
  const plusYear = () => {
    if (year >= 2022) {
      setYear(2022);
    } else {
      setYear((prev) => prev + 1);
    }
  };

  //해당 연도 인덱스 번호 가져오기
  let indexNum = Past.findIndex((obj) => obj.year === year);
  //useState로 관리된 연도와 일치하는 배열의 index를 가져옴
  //그 index로 화면에 뿌려줌

  //마우스 올리면 메뉴 펼치기
  const hovering = (index) => {
    setActive(index);
    //active에 이름 올림
  };

  //마우스 뗐을 때
  const hovered = (index) => {
    setDisabled([index, ...disabled]);
    setActive(null);
    //disabled배열에 이름 올림
    //active에서 이름 뺌
  };

  return (
    <section className={style.program}>
      <div className={style.inner}>
        <div className={style.subj}>
          <h3>History</h3>
          <div className={style.year}>
            <button
              onClick={minusYear}
              className={year <= 2018 ? style.blind : null}
            ></button>
            <span>{year}</span>
            <button
              onClick={plusYear}
              className={year >= 2022 ? style.blind : null}
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
                    active === index.toString()
                      ? style.active
                      : //active에 올려진 이름과 index가 같다면
                      //active라는 클래스명 부여
                      disabled.includes(index.toString())
                      ? //disabled 배열에 index 값이 포함되었다면
                        //item이라는 클래스명 부여
                        style.item
                      : null
                    //null -> opacity:0 인데 스크롤 애니메이션 때문에 animate로 opacity:1
                  }
                  onMouseOver={() => {
                    hovering(index.toString());
                  }}
                  onMouseOut={() => {
                    hovered(index.toString());
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
