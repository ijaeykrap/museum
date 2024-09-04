import style from "./Shop.module.css";
import { ShopItem } from "./data";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Shop() {
  const [state, setState] = useState({
    isDrag: false, //드레그 중인지 아닌지
    isClick: true,
    startX: 0, //처음 클릭한 지점
    slide: 0, //슬라이드 움직이기 시작할 위치 정하기
    showing: 0, //스크롤바 제어
    dragDistance: 0,
  });
  const [innerWidth, setInnerWidth] = useState(window.innerWidth); //화면 크기
  const isMouse = window.matchMedia("(hover:hover) and (pointer:fine)").matches; //포인터 감지
  const ref = useRef([]); //스크롤 애니메이션 ref
  const slideRef = useRef(); //슬라이드 ref
  const threshold = 13;

  //스크롤 애니메이션
  useEffect(() => {
    if (!ref) return;

    function callback(as) {
      as.forEach((a) => {
        if (a.isIntersecting) {
          a.target.classList.add(style.animate);
        }
      });
    }

    const options = { root: null, rootMargin: "0px", threshold: 0.3 };

    const io = new IntersectionObserver(callback, options);

    ref.current.forEach((el) => {
      if (el) io.observe(el);
    });

    return () => {
      io.disconnect();
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

  useEffect(() => {
    const slider = slideRef.current;

    //드레그 시작 전 클릭
    const mouseDown = (e) => {
      setState((prev) => ({
        ...prev,
        isDrag: true,
        isClick: false,
        startX: e.pageX,
        slide: slider.scrollLeft,
      }));
    };

    //드레그 움직이기
    const mouseMove = (e) => {
      if (!state.isDrag) return;

      const endX = e.pageX;
      const move = (endX - state.startX) * 1.5; //움직인 거리
      if (slideRef) {
        let position = state.slide - move;
        slider.scrollLeft = position; //스크롤 이동
        const dragDistance = Math.abs(endX - state.startX);
        setState((prev) => ({
          ...prev,
          dragDistance: dragDistance,
          isClick: dragDistance < threshold,
          //이동거리가 threshold보다 높으면 false -> 클릭 방지
          //이동거리가 threshold보다 낮으면 true -> 클릭 가능
        }));
      }
    };

    const mouseUp = () => {
      const possible = slider.scrollWidth - slider.clientWidth; //전체 스크롤 가능 거리
      const current = slider.scrollLeft; //현재 스크롤 위치
      const section = possible / 2; //전체 스크롤 3등분
      const nearest = Math.round(current / section) * section;
      slider.scrollTo({ left: nearest, behavior: "smooth" }); //스크롤 위치 딱 붙도록
      setState((prev) => ({
        ...prev,
        showing: Math.round(current / section),
        isDrag: false,
      }));
    };

    const touchStart = (e) => {
      setState((prev) => ({
        ...prev,
        isDrag: true,
        isClick: false,
        startX: e.touches[0].pageX,
        slide: slider.scrollLeft,
      }));
    };

    //터치 - 움직이기
    const touchMove = (e) => {
      if (!state.isDrag) return;
      const endX = e.touches[0].pageX;
      const move = (endX - state.startX) * 1.5; //움직인 거리
      if (slideRef) {
        let position = state.slide - move;
        slider.scrollLeft = position; //스크롤 이동
        const dragDistance = Math.abs(endX - state.startX);
        setState((prev) => ({
          ...prev,
          dragDistance: dragDistance,
          isClick: dragDistance < threshold,
          //이동거리가 threshold보다 높으면 false -> 클릭 방지
          //이동거리가 threshold보다 낮으면 true -> 클릭 가능
        }));
      }
    };

    const touchEnd = () => {
      const possible = slider.scrollWidth - slider.clientWidth; //전체 스크롤 가능 거리
      const current = slider.scrollLeft; //현재 스크롤 위치
      const section = possible / 2; //전체 스크롤 3등분
      const nearest = Math.round(current / section) * section;
      slider.scrollTo({ left: nearest, behavior: "smooth" }); //스크롤 위치 딱 붙도록
      setState((prev) => ({
        ...prev,
        showing: Math.round(current / section),
        isDrag: false,
        isClick: true,
      }));
    };

    const stopScroll = () => {
      setState((prev) => ({
        ...prev,
        isDrag: false,
        isClick: true,
      }));
    };

    const slideHandler = () => {
      if (innerWidth < 768) {
        if (isMouse) {
          //마우스 사용
          slider.addEventListener("mousedown", mouseDown, {
            passive: true,
          });
          slider.addEventListener("mousemove", mouseMove, {
            passive: true,
          });
          slider.addEventListener("mouseup", mouseUp);
          slider.addEventListener("mouseleave", stopScroll);
        } else {
          //터치
          slider.addEventListener("touchstart", touchStart, {
            passive: true,
          });
          slider.addEventListener("touchmove", touchMove, {
            passive: true,
          });
          slider.addEventListener("touchend", touchEnd);
        }
      }
    };

    slideHandler();

    return () => {
      slider.removeEventListener("mousedown", mouseDown, {
        passive: true,
      });
      slider.removeEventListener("mousemove", mouseMove, {
        passive: true,
      });
      slider.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mouseleave", stopScroll);
    };
  }, [innerWidth, isMouse, state]);

  //스크롤바 클릭시 내용 넘어감
  const onClick = (e) => {
    let num = Number(e.target.id);
    const possible =
      slideRef.current.scrollWidth - slideRef.current.clientWidth;
    setState((prev) => ({
      ...prev,
      showing: num,
    }));
    if (slideRef) {
      if (num === 0) {
        slideRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else if (num === 1) {
        slideRef.current.scrollTo({
          left: possible / 2,
          behavior: "smooth",
        });
      } else if (num === 2) {
        slideRef.current.scrollTo({
          left: possible,
          behavior: "smooth",
        });
      }
    }
  };

  //스크롤 이동 시에 페이지 링크 되는 것 방지
  const linkHandler = (e) => {
    if (!state.isClick) e.preventDefault();
  };

  console.log(state.isClick);

  return (
    <section className={style.shop}>
      <div className={style.title}>
        <div className={style.titleBlock}>
          <h2>SHOP</h2>
        </div>
      </div>
      <div className={style.inner}>
        <div
          className={style.slide}
          ref={slideRef}
          style={state.isDrag ? { cursor: "grab" } : { cursor: "unset" }}
        >
          <div className={style.list}>
            {ShopItem.map((s, index) => {
              return (
                <div className={style.item} key={index}>
                  <div className={style.block}>
                    <Link
                      to={s.link}
                      className={style.link}
                      draggable={false}
                      onClick={linkHandler}
                    >
                      <div
                        className={style.img}
                        ref={(el) => (ref.current[index] = el)}
                        style={{
                          backgroundImage: `url(${s.src})`,
                          backgroundColor: `${s.bgColor}`,
                        }}
                      >
                        {s.img}
                      </div>
                      <div className={style.text}>
                        <h3 ref={(el) => (ref.current[index + 3] = el)}>
                          {s.h3}
                        </h3>
                        <p ref={(el) => (ref.current[index + 6] = el)}>{s.p}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 스크롤 */}
      <div className={style.scroll} ref={(el) => (ref.current[9] = el)}>
        {ShopItem.map((s, index) => {
          return (
            <div
              id={index}
              key={s.img}
              onClick={onClick}
              className={state.showing === index ? style.active : null}
            ></div>
          );
        })}
      </div>

      <div className={style.more}>
        <Link to="/shop"> SHOP 바로가기 </Link>
      </div>
    </section>
  );
}
