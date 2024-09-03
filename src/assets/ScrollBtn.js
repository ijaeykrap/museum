import btn from "./ScrollBtn.module.css";
export default function ScrollBtn() {
  const toTop = () => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  };
  const toBottom = () => {
    window.scrollTo(0, document.body.scrollHeight, { behavior: "smooth" });
  };

  return (
    <div className={btn.btnContainer}>
      <button className={btn.top} onClick={toTop}>
        위로가기
      </button>
      <button className={btn.bottom} onClick={toBottom}>
        아래로 가기
      </button>
    </div>
  );
}
