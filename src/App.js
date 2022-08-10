import * as React from "react";
import { useState } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import SearchBar from "./components/search-bar/search-bar";
import UserCard from "./components/user-card/UserCard";
import { FloorBtnGroup } from "./components/floor-btn-group/Floor-btn-group";
import Box from "@mui/material/Box";
import MapWrapper from "./components/map/map";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/theme/theme";
//import Service from "./service";
import HomeOffice from "./components/home-office/home-office";

//import { useCoordinates } from "./components/useCoordinates";
//const service = new Service();

const App = () => {
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
              // handleResultFromSearch={handleResultFromSearch}
              // destroyCard={destroyCard}
              // userInfo={userInfo}
              />
              {/* {userInfo ? <UserCard userInfo={userInfo} /> : <div></div>} */}

              <UserCard />
              <FloorBtnGroup
              // activeFloor={activeFloorAndUser}
              // saveActiveFromClick={saveActiveFromClick}
              />
            </Box>
          </Grid>

          <Grid item xs={9}>
            <MapWrapper />
            {/* {activeFloorAndUser === "Дом" ? (
              <HomeOffice />
            ) : (
              <Map
                showUserCard={showUserCard}
                 userInfo={userInfo}
                 activeFloorAndUser={activeFloorAndUser}
              />
            )} */}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default App;
