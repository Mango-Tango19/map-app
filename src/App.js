import * as React from "react";
import { useState } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import SearchBar from "./components/search-bar/search-bar";
import UserCard from "./components/user-card/UserCard";
import { FloorBtnGroup } from "./components/floor-btn-group/Floor-btn-group";
import Box from "@mui/material/Box";
import Map from "./components/map/map";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/theme/theme";
import Service from "./service";

const service = new Service();

const App = () => {
  const [activeFloorAndUser, setActiveFloorAndUser] = useState(null);

  //const [userDataFromSearch, setUserDataFromSearch] = useState(null);

  //const [activeFloorFromClick, setFloorFromClick] = useState(null);

  //const [isUserVisible, setIsUserVisible] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = (id) => {
    let res = service.getUserById(id);

    setUserInfo(...res);
  };

  const handleResultFromSearch = (result) => {
    // console.log(result);Object { floor: "3", name: "Андрей Тормин", place: "2A3" }
    if (!result) return;
    setActiveFloorAndUser(result?.floor);
    getUserInfo(result);
  };

  const saveActiveFromClick = (result) => {
    setActiveFloorAndUser(result);
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
              showUserCard={showUserCard}
              userInfo={userInfo}
            />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
