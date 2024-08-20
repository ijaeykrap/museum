import { Link } from "react-router-dom";
import Category from "./Category";
import style from "../assets/Title.module.css";

export default function About() {
  return (
    <>
      <section className={style.titleSection}>
        <div className={style.inner}>
          <Link to="" className={style.title}>
            about
          </Link>
        </div>
      </section>
      <Category />
    </>
  );
}
