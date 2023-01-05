import { Button } from "@mui/material";
import { useAppDispatch } from "core/store";
import { userActions } from "core/store/slice";
import React, { FunctionComponent } from "react";
import { clearAuthKeyFromLocalStorage } from "util/";
import logo from "../common/logo.svg";
const HomePage: FunctionComponent = () => {
  const dispathc = useAppDispatch();

  const handleLogoutClick = () => {
    dispathc(userActions.setToken(null));
    clearAuthKeyFromLocalStorage();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <Button
          variant="contained"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onClick={handleLogoutClick}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
export default HomePage;
