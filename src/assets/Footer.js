import style from "./Footer.module.css";
import { FooterInfo } from "./data";

export default function Footer() {
  return (
    <footer>
      <div className={style.list}>
        <div className={style.container}>
          <ul className={style.sub}>
            <div className={style.inner}>
              {FooterInfo.sub.map((s) => {
                return (
                  <li key={s.alt}>
                    <div className={style.logo}>{s.alt}</div>
                    <div className={style.text}>
                      <h4>{s.name}</h4>
                      <span>{s.add}</span>
                      <div className={style.num}>
                        <span>{s.tel}</span>
                        <span>{s.fax}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </div>
          </ul>
          <ul className={style.link}>
            <div className={style.inner}>
              {FooterInfo.link.map((l) => {
                return (
                  <li key={l}>
                    <button>{l}</button>
                  </li>
                );
              })}
            </div>
          </ul>
        </div>
      </div>
      <div className={style.info}>
        <div className={style.inner}>
          <div className={style.anchor}>
            {FooterInfo.a.map((a) => {
              return <button key={a}>{a}</button>;
            })}
          </div>

          <div className={style.para}>
            {FooterInfo.p.map((p, index) => {
              return <p key={index}>{p}</p>;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
