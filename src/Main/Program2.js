import style from "./Program2.module.css";
import { useState, useRef, useEffect } from "react";
import { ProgramList } from "./data";

export default function Program2() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  //화면 크기 감지용
  const [slide, setSlide] = useState({
    isDrag: false, //드래그 활성화
    startX: 0, //처음 클릭한 지점
    scroll: 0, //스크롤 이동할 지점
    showing: 0, //스크롤바 표시
  });

  const animateRef = useRef([]); //스크롤 애니메이션용
  const slideRef = useRef(); //드래그 슬라이드용

  //스크롤 애니메이션
  useEffect(() => {
    if (!animateRef) return;

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

    animateRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  //화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    //컴포넌트 마운트 시 한 번 실행
    handleResize();

    //언마운트 시 없애주기
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [innerWidth]);

  //드래그 하기 전 클릭
  const mouseDown = (e) => {
    if (innerWidth < 1024 && slideRef) {
      setSlide((prev) => ({
        ...prev,
        isDrag: true,
        startX: e.pageX,
        scroll: slideRef.current.scrollLeft,
      }));
    } else if (innerWidth >= 1024) {
      setSlide((prev) => ({
        ...prev,
        isDrag: false,
      }));
    }
  };

  //드래그 움직이기
  const mouseMove = (e) => {
    const endX = e.pageX;
    const move = (endX - slide.startX) * 1.5; //움직일 거리
    if (!slide.isDrag) return;
    if (slideRef) {
      let position = slide.scroll - move;
      slideRef.current.scrollLeft = position;
      const possible =
        slideRef.current.scrollWidth - slideRef.current.clientWidth; //전체 스크롤 가능 거리
      const current = slideRef.current.scrollLeft; //현재 스크롤 위치
      const section = possible; //전체 스크롤 3등분
      const nearest = Math.round(current / section) * section;
      slideRef.current.scrollTo({ left: nearest, behavior: "smooth" });
      setSlide((prev) => ({
        ...prev,
        showing: Math.round(current / section),
      }));
    }
  };

  //스크롤바
  const onClick = (e) => {
    let num = Number(e.target.id);
    setSlide((prev) => ({
      ...prev,
      showing: num,
    }));
    if (slideRef) {
      const possible =
        slideRef.current.scrollWidth - slideRef.current.clientWidth;
      const section = possible; //전체 스크롤 3등분
      slideRef.current.scrollTo({ left: num * section, behavior: "smooth" });
    }
  };

  return (
    <section className={style.program2}>
      <div className={style.inner}>
        <div
          className={style.slide}
          ref={slideRef}
          onMouseDown={mouseDown}
          onMouseLeave={() =>
            setSlide((prev) => ({
              ...prev,
              isDrag: false,
            }))
          }
          onMouseUp={() =>
            setSlide((prev) => ({
              ...prev,
              isDrag: false,
            }))
          }
          onMouseMove={mouseMove}
        >
          <div
            className={style.list}
            style={
              slide.isDrag && innerWidth < 768
                ? { cursor: "grabbing" }
                : { cursor: "unset" }
            }
          >
            {ProgramList.map((d, index) => {
              return (
                <div key={index} className={style.item}>
                  <div>
                    <div
                      className={style.img}
                      style={{ backgroundImage: `url(${d.src})` }}
                      ref={(el) => (animateRef.current[index] = el)}
                    >
                      {d.alt}
                    </div>
                    <div className={style.text}>
                      <h3 ref={(el) => (animateRef.current[2 + index] = el)}>
                        {d.h3}
                      </h3>
                      <p ref={(el) => (animateRef.current[4 + index] = el)}>
                        {d.p}
                      </p>
                      <button
                        ref={(el) => (animateRef.current[6 + index] = el)}
                      >
                        신청하기
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 스크롤 */}
        <div
          className={style.indicator}
          ref={(el) => (animateRef.current[8] = el)}
        >
          {ProgramList.map((p, index) => {
            return (
              <div
                onClick={onClick}
                id={p.id}
                key={index}
                className={slide.showing === index ? style.active : null}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
