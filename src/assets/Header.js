import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, TimeInfo } from "./data";
import ScrollBtn from "./ScrollBtn";

import style from "./Header.module.css";

export default function Header() {
  const [menu, setMenu] = useState(false); //메뉴 열기
  const [info, setInfo] = useState(false); //관람시간 안내 열기
  const [search, setSearch] = useState(false); //검색 열기

  //메뉴(nav) 열기 닫기
  const navHandler = () => {
    setMenu((prev) => !prev);
    setInfo(false);
    setSearch(false);
  };

  //검색(search) 열기 닫기
  const searchHandler = () => {
    setSearch((prev) => !prev);
    setInfo(false);
  };

  //미술관 운영 시간(info) 열기 닫기
  const infoHandler = () => {
    setInfo((prev) => !prev);
  };

  //D 로고 누르면 main으로 이동
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
    if (menu) {
      setMenu(false);
    }
  };

  return (
    <>
      <header>
        {/* 헤더 */}
        <div className={style.headerInner}>
          {/* 로고 */}
          <h1 className={style.headerLogo} onClick={backToMain}>
            대림미술관
          </h1>

          {/* 메뉴 버튼 */}
          {!menu && (
            <button className={style.menuOpen} onClick={navHandler}>
              <span>메뉴 열기</span>
              <span></span>
              <span></span>
            </button>
          )}
          {menu && (
            <button className={style.menuClose} onClick={navHandler}>
              <span>메뉴 닫기</span>
              <span></span>
              <span></span>
            </button>
          )}
          {/* 메뉴 버튼 */}
        </div>
        {/* 헤더 */}
        {/* 메뉴 (nav) */}
        <nav
          style={{
            opacity: menu ? "1" : "0",
            left: menu ? "0" : "100%",
            transition: menu && "all 0.3s",
          }}
        >
          <h2 className={style.blind}>주메뉴영역</h2>
          <div className={style.navInner}>
            {/* 검색 버튼 */}

            <button className={style.searchOpen} onClick={searchHandler}>
              검색 창 열기
            </button>

            {/* 주 메뉴 영역 */}
            <div className={style.content}>
              {/* 카테고리 바로가기 */}
              <ul className={style.menu}>
                {Menu.map((m) => {
                  return (
                    <li key={m}>
                      <Link to={`/${m}`} onClick={navHandler}>
                        {m}
                      </Link>
                      <div className={style.line}></div>
                    </li>
                  );
                })}
              </ul>
              {/* 관람 시간 안내 */}
              <div className={style.info}>
                <button className={style.infoTitle} onClick={infoHandler}>
                  <h3>관람 시간 안내</h3>
                  {!info ? (
                    <span className={style.infoOpen}>
                      <span>관람시간안내 열기</span>
                      <span></span>
                      <span></span>
                    </span>
                  ) : (
                    <span className={style.infoClose}>
                      <span>관람시간안내 닫기</span>
                      <span></span>
                      <span></span>
                    </span>
                  )}
                </button>

                <div className={info ? style.infoContent : style.infoBlind}>
                  {TimeInfo.map((t) => {
                    return (
                      <ul className={style.infoItem} key={t.musee}>
                        <li>{t.musee}</li>
                        <li>{t.day1}</li>
                        <li>{t.day2}</li>
                        <li>{t.last}</li>
                        <li>{t.off}</li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* 주 메뉴 영역 */}
          </div>
        </nav>
        <div
          className={style.search}
          style={{
            opacity: search ? "1" : "0",
            right: search ? "0" : "100%",
            transition: search && "all 0.3s",
          }}
        >
          <div className={style.searchInner}>
            <div className={style.header}>
              <button className={style.searchClose} onClick={searchHandler}>
                <span>검색창 닫기</span>
                <span></span>
              </button>
            </div>
            <div className={style.content}>
              <input
                type="text"
                className={style.input}
                placeholder="검색어를 입력하세요"
              />

              <button className={style.searchBtn} type="button">
                검색
              </button>
            </div>
          </div>
        </div>
      </header>
      {menu ? null : <ScrollBtn />}
      {/* 메뉴가 닫혀있을 때만 위아래 이동 버튼ㅇ */}
    </>
  );
}
