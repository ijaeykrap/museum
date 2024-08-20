import style from "./Banner.module.css";
export default function Banner() {
  return (
    <section className={style.banner}>
      <div className={style.bannerInner}>
        <div className={style.img}></div>
        <div className={style.text}>
          <h3>"신진 작가들을 위한 크레이티브 커뮤니티"</h3>
          <p>
            급변하는 환경 속에서도 신선한 형태의 협업을 통해
            <br />
            흥미로운 프로젝트들을 이어가기 위해 다양한 장르에서 <br />
            활동하고 있는 신진 크리에이터들의 지원을 지속하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
