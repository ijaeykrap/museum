import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./Main/Main";
import About from "./About/About";
import Shop from "./Shop/Shop";
import ShopList from "./Shop/ShopList";
import Exhibition from "./Exhibition/Exhibition";
import PastExhibition from "./Exhibition/PastExhibition";
import Program from "./Program/Program";
import PastProgram from "./Program/PastProgram";

import ShopLayout from "./Shop/ShopRoot";
import ExhibitLayout from "./Exhibition/ExhibitionRoot";
import ProgramLayout from "./Program/ProgramRoot";

import RootLayout from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: [<RootLayout />],
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "about",
        children: [{ index: true, element: <About /> }],
      },
      {
        path: "shop",
        element: <ShopLayout />,
        children: [
          { index: true, element: <Shop /> },
          { path: ":shopId", element: <ShopList /> },
        ],
      },
      {
        path: "exhibition",
        element: <ExhibitLayout />,
        children: [
          { index: true, element: <Exhibition /> },
          { path: "past", element: <PastExhibition /> },
        ],
      },
      {
        path: "program",
        element: <ProgramLayout />,
        children: [
          { index: true, element: <Program /> },
          { path: "past", element: <PastProgram /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
