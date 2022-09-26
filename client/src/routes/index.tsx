import { Header } from "../components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Search, ItemDescription } from "../pages";
import { routes } from "./routes";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path={routes.PRINCIPAL}
        />
        <Route path={routes.ITEMS} element={<Search />} />
        <Route path={routes.CATEGORY} element={<Search />} />
        <Route path={routes.ITEM_DESCRIPTION} element={<ItemDescription />} />
      </Routes>
    </BrowserRouter>
  );
};
