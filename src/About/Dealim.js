import React, { useRef, useEffect, useState } from "react";
import { AboutInfo } from "./data";
import style from "./Dealim.module.css";

const Dealim = React.forwardRef((props, ref) => {
  const a = AboutInfo[1];
  const animateRef = useRef([]); //스크롤 애니메이션
  const scrollRef = useRef(null); //이미지 슬라이드
  const [slide, setSlide] = useState({
    isDrag: false, //드래그 하는 중인지 아닌지
    startX: 0, //드래그 시작하는 지점
    scroll: 0, //움직인 지점
    bar: 1, //스크롤바 컨트롤
    per: 16.66, //한 번 슬라이드 할 때 스크롤바 얼만큼 움직일지
  });
  const [width, setWidth] = useState(window.innerWidth); //화면 크기
  const isMouse = window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    //컴포넌트 마운트 시 한 번 실행
    handleResize();
    if (width < 768) {
      setSlide((prev) => ({
        ...prev,
        per: 16.66,
      }));
    } else if (width >= 768 && width < 1024) {
      setSlide((prev) => ({
        ...prev,
        per: 25,
      }));
    } else if (width >= 1024 && width < 1650) {
      setSlide((prev) => ({
        ...prev,
        per: 33.33,
      }));
    } else if (width >= 1650) {
      setSlide((prev) => ({
        ...prev,
        per: 50,
      }));
    }
    //언마운트 시 없애주기
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  //스크롤 애니메이션
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

  useEffect(() => {
    const scroller = scrollRef.current;

    //드래그 하려고 맨 처음 클릭
    const mouseDown = (e) => {
      setSlide((prev) => ({
        ...prev,
        isDrag: true,
      }));
      if (scrollRef.current) {
        setSlide((prev) => ({
          ...prev,
          startX: e.pageX,
          scroll: scroller.scrollLeft,
        }));
      }
    };

    const mouseMove = (e) => {
      const move = (e.pageX - slide.startX) * 1.5;
      //움직인 거리 = 움직이다가 드래그 땐 곳(e.pageX) - 처음 시작점(startX)
      if (!slide.isDrag) return;
      //isDrag가 true일 때만 움직이겠다
      if (scroller) {
        let position = slide.scroll - move;
        scroller.scrollLeft = position;
        //멈춘 지점 - 움직인 거리만큼 스크롤 보내겠다
        //scrollRef의 스크롤 지점 지정
        const possible = scroller.scrollWidth - scroller.clientWidth;
        let section;
        if (width < 768) {
          section = possible / 5;
          // 전체 스크롤 거리를 6등분 (5개의 구간으로 나누기)
        } else if (width >= 768 && width < 1024) {
          section = possible / 3;
          //전체 스크롤 거리 4등분
        } else if (width >= 1024 && width < 1650) {
          section = possible / 2;
        } else if (width >= 1650) {
          section = possible;
        }

        const currentScroll = scroller.scrollLeft;
        const nearest = Math.round(currentScroll / section) * section;
        scroller.scrollTo({ left: nearest, behavior: "smooth" });
        setSlide((prev) => ({
          ...prev,
          bar: Math.round(currentScroll / section) + 1,
        }));
      }
    };

    //터치 시작
    const touchStart = (e) => {
      setSlide((prev) => ({
        ...prev,
        isDrag: true,
      }));
      if (scrollRef.current) {
        setSlide((prev) => ({
          ...prev,
          startX: e.touches[0].pageX,
          scroll: scroller.scrollLeft,
        }));
      }
    };

    //터치 드래그
    const touchMove = (e) => {
      const move = (e.touches[0].pageX - slide.startX) * 1.5;
      //움직인 거리 = 움직이다가 드래그 땐 곳(e.pageX) - 처음 시작점(startX)
      if (!slide.isDrag) return;
      //isDrag가 true일 때만 움직이겠다
      if (scroller) {
        let position = slide.scroll - move;
        scroller.scrollLeft = position;
        //멈춘 지점 - 움직인 거리만큼 스크롤 보내겠다
        //scrollRef의 스크롤 지점 지정
        const possible = scroller.scrollWidth - scroller.clientWidth;
        let section;
        if (width < 768) {
          section = possible / 5;
          // 전체 스크롤 거리를 6등분 (5개의 구간으로 나누기)
        } else if (width >= 768 && width < 1024) {
          section = possible / 3;
          //전체 스크롤 거리 4등분
        } else if (width >= 1024 && width < 1650) {
          section = possible / 2;
        } else if (width >= 1650) {
          section = possible;
        }

        const currentScroll = scroller.scrollLeft;
        const nearest = Math.round(currentScroll / section) * section;
        scroller.scrollTo({ left: nearest, behavior: "smooth" });
        setSlide((prev) => ({
          ...prev,
          bar: Math.round(currentScroll / section) + 1,
        }));
      }
    };

    //슬라이드 드래그 멈추기
    const stopScroll = () => {
      setSlide((prev) => ({
        ...prev,
        isDrag: false,
      }));
    };

    const stopVertical = () => {
      if (slide.isDrag) {
        document.body.style.overflow = "hidden";
      } else document.body.style.overflow = "auto";
    };

    const scrollHander = () => {
      if (isMouse) {
        scroller.addEventListener("mousedown", mouseDown, { passive: true });
        scroller.addEventListener("mousemove", mouseMove, { passive: true });
        scroller.addEventListener("mouseup", stopScroll);
        scroller.addEventListener("mouseleave", stopScroll);
      } else {
        scroller.addEventListener("touchstart", touchStart, { passive: true });
        scroller.addEventListener("touchmove", touchMove, { passive: true });
        scroller.addEventListener("touchend", stopScroll);
        stopVertical();
      }
    };

    scrollHander();

    return () => {
      scroller.removeEventListener("mousedown", mouseDown);
      scroller.removeEventListener("mousemove", mouseMove);
      scroller.removeEventListener("mouseup", stopScroll);
      scroller.removeEventListener("mouseleave", stopScroll);
      scroller.removeEventListener("touchstart", touchStart);
      scroller.removeEventListener("touchmove", touchMove);
      scroller.removeEventListener("touchend", stopScroll);
    };
  }, [width, isMouse, slide]);

  return (
    <div className={style.dealim} ref={ref}>
      <div className={style.inner}>
        <div className={style.content}>
          <div
            className={style.indicator}
            ref={(el) => (animateRef.current[3] = el)}
          >
            <div
              className={style.scroll}
              style={{ width: slide.bar * slide.per + "%" }}
            ></div>
          </div>
          <div
            className={style.slide}
            ref={(el) => {
              animateRef.current[4] = el;
              scrollRef.current = el;
            }}
            style={slide.isDrag ? { cursor: "grabbing" } : { cursor: "unset" }}
          >
            <div className={style.list}>
              {a.img.map((i, index) => {
                return (
                  <div className={style.item} key={index}>
                    <div className={style.block}>
                      <div
                        className={style.img}
                        style={{
                          backgroundImage: `url(${i.src})`,
                        }}
                      >
                        {i.alt}
                      </div>
                      <span draggable={false}>{i.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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

export default Dealim;
