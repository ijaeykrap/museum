import React, { useRef, useEffect, useState } from "react";
import { AboutInfo } from "./data";
import style from "./Dmuseum.module.css";

const Dmuseum = React.forwardRef((props, ref) => {
  const a = AboutInfo[2]; //디뮤지엄 정보 가져오기
  const animateRef = useRef([]); //스크롤 애니메이션
  const scrollRef = useRef(); //이미지 슬라이드
  const [width, setWidth] = useState(window.innerWidth); //화면크기
  const isMouse = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  const iphone = navigator.userAgent.toLowerCase().indexOf("iphone");
  const ipad = navigator.userAgent.toLowerCase().indexOf("ipad");
  const macintosh = navigator.userAgent.toLowerCase().indexOf("macintosh");
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

  useEffect(() => {
    const scroller = scrollRef.current;

    //클릭 - 드래그 시작
    const mouseDown = (e) => {
      setSlide((prev) => ({
        ...prev,
        isDrag: true,
      }));
      stopVertical();
      if (scroller) {
        if (width < 768) {
          setSlide((prev) => ({
            ...prev,
            start: e.pageX,
            scroll: scroller.scrollLeft,
          }));
        } else if (width >= 768) {
          setSlide((prev) => ({
            ...prev,
            start: e.pageY,
            scroll: scroller.scrollTop,
          }));
        }
      }
    };

    //클릭 - 드래그 움직이기
    const mouseMove = (e) => {
      if (!slide.isDrag) return;
      //isDrag가 true일 때만 움직이겠다
      if (scroller) {
        let section;
        let move;
        if (width < 768) {
          move = (e.pageX - slide.start) * 1.5;
          scroller.scrollLeft = slide.scroll - move;
          const possible = scroller.scrollWidth - scroller.clientWidth;
          section = possible / 5;
          const current = scroller.scrollLeft;
          const nearest = Math.round(current / section) * section;
          scrollRef.current.scrollTo({ left: nearest, behavior: "smooth" });

          setSlide((prev) => ({
            ...prev,
            mark: Math.round(current / section) + 1,
          }));
        } else if (width >= 768) {
          move = (e.pageY - slide.start) * 1.5;
          scroller.scrollTop = slide.scroll - move;
          const possible = scroller.scrollHeight - scroller.clientHeight;
          section = possible / 2;
          const current = scroller.scrollTop;
          const nearest = Math.round(current / section) * section;
          scrollRef.current.scrollTo({ top: nearest, behavior: "smooth" });
          setSlide((prev) => ({
            ...prev,
            mark: Math.round(current / section) + 1,
          }));
        }
      }
    };

    //슬라이드 스크롤 멈추기
    const stopScroll = () => {
      setSlide((prev) => ({
        ...prev,
        isDrag: false,
      }));
    };

    const stopVertical = () => {
      const scroll = window.pageYOffset;
      if (iphone > -1 || ipad > -1 || macintosh > -1) {
        if (slide.isDrag) {
          document.body.style.position = "fixed";
          document.body.style.top = `-${scroll}px`;
        } else {
        }
        document.body.style.position = "static";
        window.scrollTo(0, scroll);
      } else {
        if (slide.isDrag) {
          document.body.style.overflow = "hidden";
        } else document.body.style.overflow = "auto";
      }
    };

    const touchStart = (e) => {
      setSlide((prev) => ({
        ...prev,
        isDrag: true,
      }));
      if (scroller) {
        if (width < 768) {
          setSlide((prev) => ({
            ...prev,
            start: e.touches[0].pageX,
            scroll: scroller.scrollLeft,
          }));
        } else if (width >= 768) {
          setSlide((prev) => ({
            ...prev,
            start: e.touches[0].pageY,
            scroll: scroller.scrollTop,
          }));
        }
      }
    };

    const touchMove = (e) => {
      if (!slide.isDrag) return;
      //isDrag가 true일 때만 움직이겠다
      if (scroller) {
        let section;
        let move;
        if (width < 768) {
          move = (e.touches[0].pageX - slide.start) * 1.5;
          scroller.scrollLeft = slide.scroll - move;
          const possible = scroller.scrollWidth - scroller.clientWidth;
          section = possible / 5;
          const current = scroller.scrollLeft;
          const nearest = Math.round(current / section) * section;
          scrollRef.current.scrollTo({ left: nearest, behavior: "smooth" });

          setSlide((prev) => ({
            ...prev,
            mark: Math.round(current / section) + 1,
          }));
        } else if (width >= 768) {
          move = (e.touches[0].pageY - slide.start) * 1.5;
          scroller.scrollTop = slide.scroll - move;
          const possible = scroller.scrollHeight - scroller.clientHeight;
          section = possible / 2;
          const current = scroller.scrollTop;
          const nearest = Math.round(current / section) * section;
          scrollRef.current.scrollTo({ top: nearest, behavior: "smooth" });
          setSlide((prev) => ({
            ...prev,
            mark: Math.round(current / section) + 1,
          }));
        }
      }
    };

    const slideHandler = () => {
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

    slideHandler();

    return () => {
      scroller.removeEventListener("mousedown", mouseDown, { passive: true });
      scroller.removeEventListener("mousemove", mouseMove, { passive: true });
      scroller.removeEventListener("mouseup", stopScroll);
      scroller.removeEventListener("mouseleave", stopScroll);
      scroller.removeEventListener("touchstart", touchStart, { passive: true });
      scroller.removeEventListener("touchmove", touchMove, { passive: true });
      scroller.removeEventListener("touchend", stopScroll);
    };
  }, [width, isMouse, slide, iphone, ipad, macintosh]);

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
