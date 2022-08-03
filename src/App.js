import * as React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import SearchBar from "./components/search-bar/search-bar";
import UserCard from "./components/user-card/UserCard";
import { FloorBtnGroup } from "./components/floor-btn-group/Floor-btn-group";
import Box from "@mui/material/Box";
import Map from "./components/map/map";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  const [activeFloor, setActiveFloor] = useState(null);

  const [activeFloorFromSearch, setFloorFromSearch] = useState(null);

  const [activeFloorFromClick, setFloorFromClick] = useState(null);

  const [isUserVisible, setIsUserVisible] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const handleFloorFromSearch = (result) => {
    // console.log(result);
    setFloorFromSearch(result?.floor);

    //по id получить данные, совместить их с координатами и показать большой кружок на карте
    //написать функцию для этого в сервисе
    const data = {
      userID: "A250",
      name: result.name,
      department: "Отдел Д-1",
      online: true,
      email: "super@mail.ru",
      phone: "122",
      position: "Разработчик",
      manager: "Боровских Илья Юрьевич",
      img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      project: ["ТМХ-VIP "],
      floor_coordinate: "A250",
      office: "ИКЦ-2",
      PC_number: "A250",
      monitors: 2,
    };
    setUserInfo(data);
    setIsUserVisible(true);
  };
  useEffect(() => {
    setActiveFloor(activeFloorFromSearch);
  }, [activeFloorFromSearch]);

  const saveActiveFromClick = (name) => {
    setFloorFromClick(name);
  };

  const showUserCard = (id) => {
    setIsUserVisible(true);
    //getUserInfo by id
    // console.log(id);
    const data = {
      userID: "A250",
      name: id,
      department: "Отдел Д-1",
      online: true,
      email: "super@mail.ru",
      phone: "122",
      position: "Разработчик",
      manager: "Боровских Илья Юрьевич",
      img: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      project: ["ТМХ-VIP "],
      floor_coordinate: "A250",
      office: "ИКЦ-2",
      PC_number: "A250",
      monitors: 2,
    };
    setUserInfo(data);
  };

  const destroyCard = () => {
    setIsUserVisible(false);
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
                handleFloorFromSearch={handleFloorFromSearch}
                destroyCard={destroyCard}
              />
              {isUserVisible ? <UserCard userInfo={userInfo} /> : <div></div>}

              <FloorBtnGroup
                activeFloor={activeFloor}
                saveActiveFromClick={saveActiveFromClick}
              />
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Map
              activeFloor={activeFloor}
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
