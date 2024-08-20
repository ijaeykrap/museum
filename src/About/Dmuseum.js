import React, { useRef, useEffect, useState } from "react";
import { AboutInfo } from "./data";
import style from "./Dmuseum.module.css";

const Dmuseum = React.forwardRef((props, ref) => {
  const a = AboutInfo[2]; //디뮤지엄 정보 가져오기
  const animateRef = useRef([]); //스크롤 애니메이션
  const scrollRef = useRef(); //이미지 슬라이드
  const [width, setWidth] = useState(window.innerWidth); //화면크기
  const [slide, setSlide] = useState({
    isDrag: false, //슬라이드 드래그 활성화?
    start: 0, //슬라이드 드래그 시작 지점
    scroll: 0, //이동한 거리
    mark: 1, //스크롤바 컨트롤
  });

  //화면 resize 감지
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
  }, []);

  //스크롤 애니메이션
  useEffect(() => {
    if (!animateRef.current) return;

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

  //드래그 하려고 맨 처음 클릭
  const mouseDown = (e) => {
    setSlide((prev) => ({
      ...prev,
      isDrag: true,
    }));
    if (scrollRef.current) {
      if (width < 768) {
        setSlide((prev) => ({
          ...prev,
          start: e.pageX,
          scroll: scrollRef.current.scrollLeft,
        }));
      } else if (width >= 768) {
        setSlide((prev) => ({
          ...prev,
          start: e.pageY,
          scroll: scrollRef.current.scrollTop,
        }));
      }
    }
  };
  const mouseMove = (e) => {
    if (!slide.isDrag) return;
    //isDrag가 true일 때만 움직이겠다
    if (scrollRef.current) {
      let section;
      let move;
      if (width < 768) {
        move = (e.pageX - slide.start) * 1.5;
        scrollRef.current.scrollLeft = slide.scroll - move;
        const possible =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        section = possible / 5;
        const current = scrollRef.current.scrollLeft;
        const nearest = Math.round(current / section) * section;
        scrollRef.current.scrollTo({ left: nearest, behavior: "smooth" });

        setSlide((prev) => ({
          ...prev,
          mark: Math.round(current / section) + 1,
        }));
      } else if (width >= 768) {
        move = (e.pageY - slide.start) * 1.5;
        scrollRef.current.scrollTop = slide.scroll - move;
        const possible =
          scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
        section = possible / 2;
        const current = scrollRef.current.scrollTop;
        const nearest = Math.round(current / section) * section;
        scrollRef.current.scrollTo({ top: nearest, behavior: "smooth" });
        setSlide((prev) => ({
          ...prev,
          mark: Math.round(current / section) + 1,
        }));
      }
    }
  };

  return (
    <div className={style.dMuseum} ref={ref} draggable={false}>
      <div className={style.inner}>
        <div className={style.text}>
          <h3 ref={(el) => (animateRef.current[0] = el)}>{a.title}</h3>
          <span ref={(el) => (animateRef.current[1] = el)}>{a.sub}</span>
          <p ref={(el) => (animateRef.current[2] = el)}>{a.p}</p>
        </div>
        <div className={style.slideWrapper}>
          <div
            className={style.slide}
            ref={(el) => {
              animateRef.current[4] = el;
              scrollRef.current = el;
            }}
            onMouseDown={mouseDown}
            onMouseLeave={() => {
              setSlide((prev) => ({
                ...prev,
                isDrag: false,
              }));
            }}
            onMouseUp={() => {
              setSlide((prev) => ({
                ...prev,
                isDrag: false,
              }));
            }}
            onMouseMove={mouseMove}
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
                      <span>{i.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={style.indicator}
            ref={(el) => (animateRef.current[3] = el)}
          >
            <div
              style={
                width < 768
                  ? { width: slide.mark * 16.66 + "%" }
                  : width >= 768
                  ? { height: slide.mark * 33.33 + "%" }
                  : { height: "4px" }
              }
              className={style.scroll}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dmuseum;
