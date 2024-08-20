import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopInfo } from "./data";

import style from "./ShopList.module.css";

export const ListPrinter = ({
  img,
  bgColor,
  place,
  rate,
  price,
  total,
  name,
}) => {
  return (
    <li>
      <div
        className={style.img}
        style={{
          backgroundImage: `url(${img})`,
          backgroundColor: `${bgColor}`,
        }}
      >
        {name}
      </div>
      <div className={style.text}>
        <span className={style.place}>{place}</span>
        <h3 className={style.name}>{name}</h3>
        <div className={style.price}>
          <div className={style.sale}>
            <span className={style.prix}>{price}</span>
            <span className={style.rate}>{rate}</span>
          </div>
          <span className={style.total}>{total}</span>
        </div>
      </div>
    </li>
  );
};

export default function ShopList() {
  let params = useParams();
  let myId = params.shopId; //어떤 페이지 들어갔는지
  const [visible, setVisible] = useState(6); //화면에 몇개 보이게 할 지

  let myItem = [];

  if (myId === "all") {
    myItem = ShopInfo.reduce((acc, cur) => acc.concat(cur.item), []);
  } else {
    let myIndex = ShopInfo.findIndex((f) => f.id === myId);
    if (myIndex !== -1) {
      myItem = ShopInfo[myIndex].item;
    }
  }
  //id에 맞춰서 배열 가져오기

  useEffect(() => {
    setVisible(6);
  }, [myId]);
  //myId가 이전꺼랑 다르다면 다시 visible을 6개로

  const showMore = () => {
    setVisible((prev) => prev + 6);
  }; //버튼 누르면 6개씩 늘어나기

  return (
    <>
      <section className={style.item}>
        <ul>
          <div className={style.inner}>
            {myItem.slice(0, visible).map((i, index) => {
              return (
                <ListPrinter
                  key={i.name}
                  img={i.img}
                  bgColor={i.bgColor}
                  place={i.place}
                  rate={i.rate}
                  price={i.price}
                  total={i.total}
                  name={i.name}
                />
              );
            })}
          </div>
        </ul>

        {visible < myItem.length && (
          <div className={style.more}>
            <button onClick={showMore}>더보기</button>
          </div>
        )}
      </section>
    </>
  );
}
