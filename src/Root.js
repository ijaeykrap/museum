import { Outlet } from "react-router-dom";

import Header from "./assets/Header";
import Footer from "./assets/Footer";
import ScrollToTop from "./assets/ScrollRestoration";

function RootLayout() {
  return (
    <>
      <Header style={{ position: "relative" }} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default RootLayout;
