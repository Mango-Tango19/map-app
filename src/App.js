import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import SearchBar from "./components/search-bar/search-bar";
import UserCard from "./components/user-card/UserCard";
import { FloorBtnGroup } from "./components/floor-btn-group/Floor-btn-group";
import Box from "@mui/material/Box";
import Map from "./components/map/map";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { actions } from "./store/user-slice";
import useUserInfo from "./useUserInfo";
//import useUserInfo from "./useUserInfo";

import Service from "./service";

const service = new Service();

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
      white: {
        light: "#FFFFFF",
        main: "#FFFFFF",
        dark: "#ef6c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
    },
  });

  const [activeFloorAndUser, setActiveFloorAndUser] = useState(null);

  const [userDataFromSearch, setUserDataFromSearch] = useState(null);

  const [activeFloorFromClick, setFloorFromClick] = useState(null);

  //const [isUserVisible, setIsUserVisible] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const dispatch = useDispatch();

  //const { setUrerById, userById } = useUserInfo();

  const getUserInfo = (id) => {
    let res = service.getUserById(id);
    setUserInfo(res);
  };

  const handleResultFromSearch = (result) => {
    // console.log(result);Object { floor: "3", name: "Андрей Тормин", place: "2A3" }
    if (!result) return;
    setUserDataFromSearch(result);
    getUserInfo(result);
  };

  useEffect(() => {
    if (!userDataFromSearch) return;
    // userDataFromSearch { floor: "3", name: "Андрей Тормин", place: "2A3" }
    setActiveFloorAndUser(userDataFromSearch);

    // dispatch(actions.getUserById(userDataFromSearch.place));
  }, [userDataFromSearch]);

  const saveActiveFromClick = (name) => {
    setFloorFromClick(name);
  };

  const destroyCard = () => {
    setUserInfo(null);
  };

  const showUserCard = (res) => {
    setUserInfo(res);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Box
              sx={{
                minHeight: "96vh",
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr 2fr .1fr",
                rowGap: "20px",
              }}
            >
              <SearchBar
                handleResultFromSearch={handleResultFromSearch}
                destroyCard={destroyCard}
              />
              {userInfo ? <UserCard userInfo={userInfo} /> : <div></div>}
              <FloorBtnGroup
                activeFloor={activeFloorAndUser?.floor}
                saveActiveFromClick={saveActiveFromClick}
              />
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Map
              activeFloorAndUser={activeFloorAndUser}
              activeFloorFromClick={activeFloorFromClick}
              showUserCard={showUserCard}
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
