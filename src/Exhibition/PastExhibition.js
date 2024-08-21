import { useState, useMemo, useRef, useEffect } from "react";
import { Past, Index, Year } from "./data";

import style from "./PastExhibition.module.css";

function PastExhibition() {
  const [select, setSelect] = useState({
    place: "not selected", //미술관 설정
    year: -1, //연도 설정
  });
  const [list, setList] = useState({
    width: window.innerWidth,
    visible: 6, //화면 크기에따라 받는 값 (375,768 -> 4, 1024 -> 6, 1650 -> 8)
    showing: 6, //화면에 보여지는 개수 (375px에서 더보기 버튼 눌렀을 경우 4+4)
  });
  const ref = useRef([]);

  //화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setList((prev) => ({
        ...prev,
        width: window.innerWidth,
      }));
    };
    window.addEventListener("resize", handleResize);

    //컴포넌트 마운트 시 한 번 실행
    handleResize();

    //언마운트 시 없애주기
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //화면(width) 리사이즈 될 때마다 visible 값 바꿔줌
  //visible 값 바뀔 때마다 showing값도 바꿔서 화면에 띄움
  useEffect(() => {
    if (list.width < 1024) {
      setList((prev) => ({
        ...prev,
        visible: 4,
      }));
    } else if (list.width >= 1024 && list.width < 1650) {
      setList((prev) => ({
        ...prev,
        visible: 6,
      }));
    } else if (list.width >= 1650) {
      setList((prev) => ({
        ...prev,
        visible: 8,
      }));
    }
    setList((prev) => ({
      ...prev,
      showing: list.visible,
    }));
    //화면 크기에 따라 몇개씩 보여질 지 결정하고 그만큼 화면에 보이게 함
  }, [list.width, list.visible]);

  //미술관 선택
  const placeHandler = (e) => {
    const placeSelected = e.target.innerText;
    if (select.place !== placeSelected) {
      setSelect((prev) => ({
        ...prev,
        place: placeSelected,
        year: -1,
      }));
      setList((prev) => ({
        ...prev,
        showing: list.visible,
      }));
    } else if (select.place === placeSelected) {
      //인덱스 버튼 한 번 더 클릭하면 전체보기로 돌아감
      setSelect((prev) => ({
        ...prev,
        place: "not selected",
        year: -1,
      }));
      setList((prev) => ({
        ...prev,
        showing: list.visible,
      }));
    }
  };

  const filteredArr = useMemo(() => {
    let arrs =
      select.place === "not selected"
        ? Past
        : Past.filter((arr) => arr.place === select.place);
    //미술관x -> Past
    //미술관o -> Past.filter(place)
    if (select.year !== -1) {
      arrs = arrs.filter((arr) => arr.date.startsWith(select.year));
      //미술관o,전시연도o-> Past.filter(place).filter(year)
      //미술관x,전시연도o-> Past.filter(year)
      //미술관x,전시연도x -> Past
    }
    return arrs; //최종적으로 걔네들을 arrs로 메모리에 저장
  }, [select.place, select.year]);
  //place와 year의 값이 변할 때마다 메모리에서 가져옴

  //전시 시작 연도 선택
  const yearHandler = (e) => {
    const yearSelected = Number(e.target.value);
    setSelect((prev) => ({
      ...prev,
      year: yearSelected,
    }));
    setList((prev) => ({
      ...prev,
      showing: list.visible,
    }));
  };

  //'더보기' 버튼
  const showMore = () => {
    setList((prev) => ({
      ...prev,
      showing: list.showing + list.visible,
    }));
  };
  return (
    <>
      <section className={style.content}>
        {/* 미술관 선택*/}
        <div className={style.index}>
          <ul>
            {Index.map((i, index) => {
              return (
                <li
                  key={i}
                  onClick={placeHandler}
                  className={select.place === `${i}` ? style.pushed : undefined}
                  ref={(el) => (ref.current[index] = el)}
                >
                  {i}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.list}>
          <div className={style.inner}>
            {/* 전시연도 선택*/}
            <div className={style.yearBlock}>
              <select
                className={style.year}
                onChange={yearHandler}
                value={select.year}
                ref={(el) => (ref.current[4] = el)}
              >
                <option value="-1">-- Select Year --</option>
                {Year.map((y) => {
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>
            {/*리스트*/}
            <ul>
              {filteredArr.length >= 1 ? (
                filteredArr.slice(0, list.showing).map((m, index) => {
                  return (
                    <li key={index}>
                      <div className={style.text}>
                        <span className={style.place}>{m.place}</span>
                        <h3 className={style.title}>{m.title}</h3>
                        <span className={style.sub}>{m.sub}</span>
                        <span className={style.date}>{m.date}</span>
                      </div>
                      <div
                        className={style.img}
                        style={{ backgroundImage: `url(${m.src})` }}
                      ></div>
                    </li>
                    //배열 개수가 하나라도 있으면 화면에 표시
                  );
                })
              ) : (
                <h3 className={style.nothing}>해당 연도의 전시가 없습니다.</h3>
                //배열 개수가 없으면 없다는 내용 표시
              )}
            </ul>
          </div>
        </div>
        {/*더보기 버튼*/}
        {list.showing < filteredArr.length && (
          <div className={style.more}>
            <button onClick={showMore}>더보기</button>
          </div>
        )}
      </section>
    </>
  );
}

export default PastExhibition;
