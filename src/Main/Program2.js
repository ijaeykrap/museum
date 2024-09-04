import style from "./Program2.module.css";
import { useState, useRef, useEffect } from "react";
import { ProgramList } from "./data";

export default function Program2() {
  const [width, setWidth] = useState(window.innerWidth); //화면 크기
  const isMouse = window.matchMedia("(hover:hover) and (pointer:fine)").matches; //포인터 감지
  //슬라이드
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
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    //컴포넌트 마운트 시 한 번 실행
    handleResize();

    //언마운트 시 없애주기
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

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

  useEffect(() => {
    const slider = slideRef.current;

    //클릭 시작
    const mouseDown = (e) => {
      setSlide((prev) => ({
        ...prev,
        isDrag: true,
        startX: e.pageX,
        scroll: slideRef.current.scrollLeft,
      }));
    };

    //드래그
    const mouseMove = (e) => {
      const endX = e.pageX;
      const move = (endX - slide.startX) * 1.5; //움직일 거리
      if (!slide.isDrag) return;
      if (slider) {
        let position = slide.scroll - move;
        slider.scrollLeft = position;
        const possible = slider.scrollWidth - slider.clientWidth; //전체 스크롤 가능 거리
        const current = slider.scrollLeft; //현재 스크롤 위치
        const section = possible; //전체 스크롤 3등분
        const nearest = Math.round(current / section) * section;
        slider.scrollTo({ left: nearest, behavior: "smooth" });
        setSlide((prev) => ({
          ...prev,
          showing: Math.round(current / section),
        }));
      }
    };

    //드래그 멈추기
    const stopScroll = () => {
      setSlide((prev) => ({
        ...prev,
        isDrag: false,
      }));
    };

    //터치 시작
    const touchStart = (e) => {
      setSlide((prev) => ({
        ...prev,
        isDrag: true,
        startX: e.touches[0].pageX,
        scroll: slider.scrollLeft,
      }));
    };

    //터치로 움직이기
    const touchMove = (e) => {
      const endX = e.touches[0].pageX;
      const move = (endX - slide.startX) * 1.5; //움직일 거리
      if (!slide.isDrag) return;
      if (slider) {
        let position = slide.scroll - move;
        slider.scrollLeft = position;
        const possible = slider.scrollWidth - slider.clientWidth; //전체 스크롤 가능 거리
        const current = slider.scrollLeft; //현재 스크롤 위치
        const section = possible; //전체 스크롤 3등분
        const nearest = Math.round(current / section) * section;
        slider.scrollTo({ left: nearest, behavior: "smooth" });
        setSlide((prev) => ({
          ...prev,
          showing: Math.round(current / section),
        }));
      }
    };

    const slideHandler = () => {
      //화면 크기가 1024 이하
      if (width < 1024) {
        if (isMouse) {
          //마우스 사용
          slider.addEventListener("mousedown", mouseDown, {
            passive: true,
          });
          slider.addEventListener("mousemove", mouseMove, {
            passive: true,
          });
          slider.addEventListener("mouseup", stopScroll);
          slider.addEventListener("mouseleave", stopScroll);
        } else {
          //터치
          slider.addEventListener("touchstart", touchStart, {
            passive: true,
          });
          slider.addEventListener("touchmove", touchMove, {
            passive: true,
          });
          slider.addEventListener("touchend", stopScroll);
        }
      }
    };

    slideHandler();

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mousemove", mouseMove);
      slider.removeEventListener("mouseup", stopScroll);
      slider.removeEventListener("mouseleave", stopScroll);
      slider.removeEventListener("touchstart", touchStart);
      slider.removeEventListener("touchmove", touchMove);
      slider.removeEventListener("touchend", stopScroll);
    };
  }, [width, isMouse, slide]);

  return (
    <section className={style.program2}>
      <div className={style.inner}>
        <div className={style.slide} ref={slideRef}>
          <div
            className={style.list}
            style={
              slide.isDrag && width < 768
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
