import { FrontInfo } from "./data";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Shop.module.css";

export default function Shop() {
  const myRef = useRef([]); //스크롤 애니메이션
  const slideRef = useRef([]); //이미지 슬라이드
  const [order, setOrder] = useState([0, 0]);
  //슬라이드에서 보여줄 사진 순서 관리

  //스크롤 애니메이션
  useEffect(() => {
    if (!myRef) return;

    function callback(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(style.animate);
        }
      });
    }

    const options = { root: null, rootmargin: "0px", threshold: 0.5 };

    const io = new IntersectionObserver(callback, options);

    myRef.current.forEach((el) => {
      if (el) io.observe(el);

      return () => {
        io.disconnect();
      };
    });
  }, []);

  const onLeft = (e) => {
    const num = Number(e.currentTarget.parentElement.id);
    //어떤 슬라이드의 버튼을 눌렀는지
    setOrder((prev) => {
      const newOrder = [...prev]; //이전 상태 복사
      newOrder[num] = Math.max(newOrder[num] - 1, 0);
      return newOrder;
    });
    //누를 때마다 order -1씩 감소
  };

  const onRight = (e) => {
    const num = Number(e.currentTarget.parentElement.id);
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder[num] = Math.min(newOrder[num] + 1, 3);
      return newOrder;
    });
  };

  return (
    <>
      <section className={style.front}>
        <div
          className={style.photo}
          ref={(el) => (myRef.current[0] = el)}
        ></div>

        <ul className={style.list}>
          {FrontInfo.map((f, index) => {
            return (
              <li className={style.item} key={f.sort}>
                <div className={style.inner}>
                  <div
                    className={style.imgArea}
                    ref={(el) => (myRef.current[3 + index] = el)}
                  >
                    <div
                      className={style.slideWrapper}
                      ref={(el) => {
                        slideRef.current[index] = el;
                      }}
                    >
                      <ul
                        className={style.slide}
                        style={{
                          transform: `translateX(${order[index] * -25 + "%"})`,
                        }}
                      >
                        {FrontInfo[index].img.map((i, index) => {
                          return (
                            <li key={index} className={style.slideItem}>
                              <div
                                className={style.img}
                                style={{ backgroundImage: `url(${i.src})` }}
                              ></div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className={style.btnArea} id={index}>
                      <div className={style.btn} onClick={onLeft}>
                        <button className={style.left}></button>
                      </div>
                      <div className={style.btn} onClick={onRight}>
                        <button className={style.right}></button>
                      </div>
                    </div>
                  </div>
                  <div
                    className={style.text}
                    ref={(el) => (myRef.current[1 + index] = el)}
                  >
                    <span>{f.sort}</span>
                    <h3>{f.title}</h3>
                    <p>{f.des}</p>
                    <div className={style.btn}>
                      <Link to={f.sort} className={style.link}>
                        {f.btn}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={style.more}>
          <Link to="all" id={"ALL"}>
            전체 상품 보기
          </Link>
        </div>
      </section>
    </>
  );
}
