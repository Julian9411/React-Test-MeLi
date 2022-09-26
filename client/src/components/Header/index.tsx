import { KeyboardEvent, useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/Logo_ML@2x.png";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

export const Header = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const search = () => {
    searchValue !== "" && navigate(`/${routes.ITEMS}?q=${searchValue}`);
  };

  const pressEnter = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <header className="header_container">
      <div className="content_container">
        <div onClick={() => navigate('/')}>
          <img src={logo} alt="logo" />
        </div>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            onKeyPress={pressEnter}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            endIcon={<SearchIcon />}
            variant="contained"
            onClick={search}
          />
        </div>
      </div>
    </header>
  );
};
